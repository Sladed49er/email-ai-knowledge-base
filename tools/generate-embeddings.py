import os
import json
import requests
import base64
from bs4 import BeautifulSoup
import markdown

# This script is meant to be run locally or in a GitHub Action
# You'll need to set your OpenAI API key as an environment variable
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
REPO_OWNER = "your-username"  # Replace with your GitHub username
REPO_NAME = "email-ai-knowledge-base"  # Replace with your repo name

# GitHub API functions
def get_file_content(path):
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{path}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        content = response.json()
        file_content = base64.b64decode(content["content"]).decode("utf-8")
        return file_content, content["sha"]
    return None, None

def update_file(path, content, message, sha=None):
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{path}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    
    # If we don't have the sha, try to get it
    if not sha:
        _, sha = get_file_content(path)
    
    data = {
        "message": message,
        "content": base64.b64encode(content.encode()).decode(),
    }
    
    if sha:
        data["sha"] = sha
        
    response = requests.put(url, headers=headers, json=data)
    return response.status_code == 200 or response.status_code == 201

# Get all markdown files in the data directory
def get_data_files():
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/data"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(url, headers=headers)
    
    files = []
    if response.status_code == 200:
        contents = response.json()
        for item in contents:
            if item["type"] == "file" and item["name"].endswith(".md"):
                files.append(item["path"])
    
    return files

# Generate embedding using OpenAI API
def generate_embedding(text):
    url = "https://api.openai.com/v1/embeddings"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "input": text,
        "model": "text-embedding-ada-002"
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["data"][0]["embedding"]
    else:
        print(f"Error generating embedding: {response.text}")
        return None

# Process each markdown file
def process_files():
    data_files = get_data_files()
    all_vectors = []
    
    for file_path in data_files:
        if not file_path.endswith(".md") or file_path.endswith("README.md"):
            continue
            
        content, _ = get_file_content(file_path)
        if not content:
            continue
            
        # Convert markdown to text
        html = markdown.markdown(content)
        text = BeautifulSoup(html, "html.parser").get_text()
        
        # Generate embedding
        embedding = generate_embedding(text)
        if not embedding:
            continue
            
        # Create vector file
        vector_data = {
            "text": text,
            "embedding": embedding,
            "file": file_path
        }
        
        vector_file_path = f"vectors/{os.path.basename(file_path).replace('.md', '.json')}"
        update_file(
            vector_file_path,
            json.dumps(vector_data, indent=2),
            f"Generated embedding for {file_path}"
        )
        
        # Add to index
        all_vectors.append({
            "file": file_path,
            "vector_file": vector_file_path
        })
        
        print(f"Processed {file_path}")
    
    # Create index file
    update_file(
        "vectors/index.json",
        json.dumps(all_vectors, indent=2),
        "Updated vector index"
    )
    
    print("Vector generation complete")

if __name__ == "__main__":
    process_files()

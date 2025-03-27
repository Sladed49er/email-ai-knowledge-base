// Function to get the current content of a file
async function getFileContent(filepath) {
  try {
    // Call GitHub API to get the file
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filepath}`, {
      headers: {
        'Authorization': 'token ' + sessionStorage.getItem('github_token')
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${filepath}`);
    }
    
    const data = await response.json();
    return {
      content: atob(data.content),
      sha: data.sha
    };
  } catch (error) {
    console.error('Error getting file content:', error);
    return null;
  }
}

// Function to update a file in the repository
async function updateKnowledgeBase(filepath, content, commitMessage) {
  try {
    // First get the current file to get its SHA
    const currentFile = await getFileContent(filepath);
    if (!currentFile && !filepath.includes('new-')) {
      throw new Error(`File not found: ${filepath}`);
    }
    
    // Call GitHub API to update the file
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filepath}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'token ' + sessionStorage.getItem('github_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: btoa(content), // Base64 encode content
        sha: currentFile ? currentFile.sha : undefined
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update file: ${errorData.message}`);
    }
    
    const result = await response.json();
    
    // Trigger embedding generation if this is a data file
    if (filepath.startsWith('data/') && filepath.endsWith('.md')) {
      await triggerEmbeddingGeneration();
    }
    
    return {
      success: true,
      commit: result.commit
    };
  } catch (error) {
    console.error('Error updating file:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to trigger the embedding generation process
async function triggerEmbeddingGeneration() {
  // In a real implementation, this would call a GitHub Action or webhook
  // For demo purposes, we'll just show an alert
  console.log('Triggering embedding generation...');
  alert('Changes saved. Embeddings will be regenerated shortly.');
  
  // In a production environment, you would call an API endpoint that triggers
  // the embedding generation script to run
}

// Replace these with your actual GitHub username and repository name
const GITHUB_USERNAME = 'Sladed49er';
const GITHUB_REPO = 'email-ai-knowledge-base';

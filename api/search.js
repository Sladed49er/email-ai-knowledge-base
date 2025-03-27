// Function to get the embedding for a search query
async function getEmbedding(text) {
  // NOTE: In a production environment, you would call your own backend
  // that securely uses your OpenAI API key - this is just for demonstration
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('openai_key') // Temporarily stored key
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-ada-002"
    })
  });
  
  const data = await response.json();
  return data.data[0].embedding;
}

// Function to load all vectors
async function loadVectors() {
  try {
    // First, load the index file
    const indexResponse = await fetch('/vectors/index.json');
    if (!indexResponse.ok) {
      throw new Error('Failed to load vector index');
    }
    
    const index = await indexResponse.json();
    const vectors = [];
    
    // Load each vector file
    for (const item of index) {
      const vectorResponse = await fetch('/' + item.vector_file);
      if (vectorResponse.ok) {
        const vectorData = await vectorResponse.json();
        vectors.push(vectorData);
      }
    }
    
    return vectors;
  } catch (error) {
    console.error('Error loading vectors:', error);
    return [];
  }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (normA * normB);
}

// Search the knowledge base using semantic similarity
async function searchKnowledgeBase(query, topN = 3) {
  try {
    // Get the query embedding
    const queryEmbedding = await getEmbedding(query);
    
    // Load all vectors
    const vectors = await loadVectors();
    
    // Calculate similarity scores and sort results
    const results = vectors
      .map(item => ({
        file: item.file,
        text: item.text,
        similarity: cosineSimilarity(queryEmbedding, item.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topN);
    
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

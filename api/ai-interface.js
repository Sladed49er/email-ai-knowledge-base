// Process natural language requests from AI assistants
async function processAIRequest(instruction) {
  try {
    // Parse the instruction to determine what action to take
    const action = parseInstruction(instruction);
    
    if (action.type === 'search') {
      // Search the knowledge base
      return await searchKnowledgeBase(action.query);
    } 
    else if (action.type === 'update') {
      // Get current content
      const fileData = await getFileContent(action.filepath);
      if (!fileData) {
        return { 
          success: false, 
          error: `File not found: ${action.filepath}` 
        };
      }
      
      // Apply changes
      let newContent;
      if (action.changeType === 'replace') {
        newContent = fileData.content.replace(action.oldText, action.newText);
      } else if (action.changeType === 'append') {
        newContent = fileData.content + '\n\n' + action.newText;
      } else {
        newContent = action.newContent;
      }
      
      // Update the file
      return await updateKnowledgeBase(
        action.filepath,
        newContent,
        `Updated by AI assistant: ${action.reason}`
      );
    } 
    else if (action.type === 'create') {
      // Create new file
      return await updateKnowledgeBase(
        action.filepath,
        action.content,
        `Created by AI assistant: ${action.reason}`
      );
    }
    else {
      return {
        success: false,
        error: 'Unknown action type'
      };
    }
  } catch (error) {
    console.error('Error processing AI request:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Parse natural language instructions into structured actions
function parseInstruction(instruction) {
  // This is a simplified parser - a more robust solution would use NLP
  const lowerInstruction = instruction.toLowerCase();
  
  if (lowerInstruction.includes('search') || lowerInstruction.includes('find')) {
    // This is a search request
    const queryMatch = instruction.match(/(?:search|find|query|look up)[:\s]+(.+?)(?:$|\.|in the knowledge base)/i);
    const query = queryMatch ? queryMatch[1].trim() : instruction;
    
    return {
      type: 'search',
      query: query
    };
  }
  else if (lowerInstruction.includes('update') || lowerInstruction.includes('modify') || lowerInstruction.includes('change')) {
    // This is an update request
    const filepathMatch = instruction.match(/(?:update|modify|change)[:\s]+([^\s]+\.md)/i);
    const filepath = filepathMatch ? filepathMatch[1].trim() : null;
    
    if (!filepath) {
      throw new Error('Could not determine which file to update');
    }
    
    // Determine update type
    if (lowerInstruction.includes('replace')) {
      const match = instruction.match(/replace[:\s]+"([^"]+)"[:\s]+with[:\s]+"([^"]+)"/i);
      if (match) {
        return {
          type: 'update',
          filepath: filepath,
          changeType: 'replace',
          oldText: match[1],
          newText: match[2],
          reason: 'Content update requested'
        };
      }
    }
    
    // Default to full content replacement
    const contentMatch = instruction.match(/(?:content|with|to)[:\s]+```([\s\S]+?)```/i);
    const newContent = contentMatch ? contentMatch[1].trim() : null;
    
    if (!newContent) {
      throw new Error('Could not determine new content for update');
    }
    
    return {
      type: 'update',
      filepath: filepath,
      changeType: 'full',
      newContent: newContent,
      reason: 'Full content update requested'
    };
  }
  else if (lowerInstruction.includes('create') || lowerInstruction.includes('add new')) {
    // This is a create request
    const filepathMatch = instruction.match(/(?:create|add)[:\s]+([^\s]+\.md)/i);
    const filepath = filepathMatch ? filepathMatch[1].trim() : null;
    
    if (!filepath) {
      throw new Error('Could not determine filepath for new file');
    }
    
    const contentMatch = instruction.match(/(?:content|with|containing)[:\s]+```([\s\S]+?)```/i);
    const content = contentMatch ? contentMatch[1].trim() : null;
    
    if (!content) {
      throw new Error('Could not determine content for new file');
    }
    
    return {
      type: 'create',
      filepath: filepath,
      content: content,
      reason: 'New content creation requested'
    };
  }
  
  throw new Error('Could not parse instruction: ' + instruction);
}

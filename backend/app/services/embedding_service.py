import os
import aiohttp
from typing import List, Dict, Any
import json
import mimetypes

def is_text_file(file_path: str) -> bool:
    """Check if a file is likely to be a text file based on extension"""
    text_extensions = {'.txt', '.md', '.py', '.js', '.html', '.css', '.json', '.csv', '.log', '.xml', '.yml', '.yaml'}
    return os.path.splitext(file_path)[1].lower() in text_extensions

async def process_file_for_embeddings(file_path: str) -> Dict[str, Any]:
    """
    Process a file and generate embeddings using Ollama's chat endpoint
    """
    # Check if it's a text file
    if not is_text_file(file_path):
        raise Exception(f"Unsupported file type. Please upload a text file with one of these extensions: .txt, .md, .py, .js, .html, .css, .json, .csv")
    
    # Read the file content
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Try again with error handling
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

    # Prepare the request payload for Ollama
    payload = {
        "model": "llama2",  # Using llama2 as default model
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant that processes text and provides semantic understanding."
            },
            {
                "role": "user",
                "content": content
            }
        ]
    }

    # Call Ollama's chat endpoint
    async with aiohttp.ClientSession() as session:
        async with session.post('http://localhost:11434/api/chat', json=payload) as response:
            if response.status != 200:
                error_text = await response.text()
                raise Exception(f"Ollama API error: {response.status} - {error_text}")
            
            response_data = await response.json()
            
            # Store response along with metadata
            result = {
                "filename": os.path.basename(file_path),
                "content": content,
                "processed_content": response_data.get("message", {}).get("content", "")
            }

            # Save results to a JSON file for persistence
            embeddings_dir = "embeddings"
            os.makedirs(embeddings_dir, exist_ok=True)
            
            output_path = os.path.join(embeddings_dir, f"{os.path.basename(file_path)}.json")
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False)

            return result 
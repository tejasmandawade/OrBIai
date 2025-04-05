import aiohttp
import json
import os
from typing import List
from app.models.request_models import Message

# Get the Ollama API URL from environment variables or use default
OLLAMA_API_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434/api/chat")
LLAMA_MODEL = os.getenv("LLAMA_MODEL", "llama3")

async def get_llm_response(messages: List[Message]) -> str:
    """
    Get a response from LLaMA 3 via Ollama API
    """
    # Format messages for Ollama API
    formatted_messages = [{"role": msg.role, "content": msg.content} for msg in messages]
    
    # Prepare the request payload
    payload = {
        "model": LLAMA_MODEL,
        "messages": formatted_messages,
        "stream": False
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.post(OLLAMA_API_URL, json=payload) as response:
            if response.status != 200:
                error_text = await response.text()
                raise Exception(f"Ollama API error: {response.status} - {error_text}")
            
            # Parse the response
            response_data = await response.json()
            
            # Extract the assistant's message
            if "message" in response_data and "content" in response_data["message"]:
                return response_data["message"]["content"]
            else:
                raise Exception("Unexpected response format from Ollama API") 
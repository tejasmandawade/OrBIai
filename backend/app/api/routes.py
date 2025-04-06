from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.models.request_models import ChatRequest
from app.models.response_models import ChatResponse
from app.services.llm_service import get_llm_response
from app.services.embedding_service import process_file_for_embeddings
import os

router = APIRouter(prefix="/api", tags=["chat"])

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with LLaMA 2 model via Ollama
    """
    try:
        response = await get_llm_response(request.messages)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM service error: {str(e)}")

@router.post("/files/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a file and process it for embeddings
    """
    try:
        # Create uploads directory if it doesn't exist
        os.makedirs("uploads", exist_ok=True)
        
        # Save the file
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process the file for embeddings
        try:
            embedding_result = await process_file_for_embeddings(file_path)
            return {
                "message": "File uploaded and processed successfully",
                "filename": file.filename,
                "embedding_status": "success"
            }
        except Exception as e:
            return {
                "message": f"File uploaded but embedding failed: {str(e)}",
                "filename": file.filename,
                "embedding_status": "failed"
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}") 
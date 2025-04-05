from fastapi import APIRouter, Depends, HTTPException
from app.models.request_models import ChatRequest
from app.models.response_models import ChatResponse
from app.services.llm_service import get_llm_response

router = APIRouter(prefix="/api", tags=["chat"])

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with LLaMA 3 model via Ollama
    """
    try:
        response = await get_llm_response(request.messages)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM service error: {str(e)}") 
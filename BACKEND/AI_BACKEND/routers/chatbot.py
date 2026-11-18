from fastapi import APIRouter, HTTPException, Query
from schemas.chatbot import ChatbotRequest
from services.chatbot_service import answer_travel_question
router = APIRouter(prefix="/chatbot", tags=["AI Travel Chatbot"])
@router.get("/")
def chatbot_home(): return {"success": True, "message": "Exploria AI Travel Chatbot is ready."}
def _create_chatbot_answer(message: str):
    try:
        answer = answer_travel_question(message)
    except Exception as exc:
        # Do not expose provider credentials or internal exception details.
        raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server's Groq configuration and provider status.") from exc
    return {"success": True, "user_message": message, "response": answer}

@router.post("/ask")
def ask_chatbot(data: ChatbotRequest):
    return _create_chatbot_answer(data.message)

@router.get("/ask", include_in_schema=False)
def ask_chatbot_legacy(message: str = Query(..., min_length=1, max_length=4000)):
    """Compatibility route for the earlier query-string chatbot contract."""
    return _create_chatbot_answer(message)

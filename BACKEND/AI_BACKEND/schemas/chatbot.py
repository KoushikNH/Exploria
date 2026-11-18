from pydantic import BaseModel, Field
class ChatbotRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
class ChatbotResponse(BaseModel):
    success: bool = True
    user_message: str
    response: str

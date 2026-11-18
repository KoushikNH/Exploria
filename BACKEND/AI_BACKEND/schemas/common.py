from pydantic import BaseModel, Field


class APIMessage(BaseModel):
    success: bool = True
    message: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: str

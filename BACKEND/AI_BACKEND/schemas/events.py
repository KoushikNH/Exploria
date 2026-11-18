from datetime import date
from pydantic import BaseModel, Field
class EventSearchRequest(BaseModel):
    destination: str = Field(min_length=2, max_length=120)
    event_date: date | None = None
    category: str = Field(default="all", max_length=80)
class EventSearchResponse(BaseModel):
    success: bool = True
    destination: str
    event_date: str
    category: str
    research_guidance: str
    notice: str = "No live event listings are supplied unless connected to a verified event source."

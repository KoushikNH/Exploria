from pydantic import BaseModel, Field
class CulturalGuideRequest(BaseModel):
    destination: str = Field(min_length=2, max_length=120)
    topic: str = Field(default="general", min_length=2, max_length=80)
class CulturalGuideResponse(BaseModel):
    success: bool = True
    destination: str
    guidance: str
    notice: str = "Confirm site-specific rules with official or on-site sources."

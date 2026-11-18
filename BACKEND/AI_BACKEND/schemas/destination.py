from pydantic import BaseModel, Field
class DestinationSearchRequest(BaseModel):
    destination: str = Field(min_length=2, max_length=120)
class DestinationInformation(BaseModel):
    attractions: list[str] = Field(default_factory=list)
    popular_food: list[str] = Field(default_factory=list)
    accommodation: list[str] = Field(default_factory=list)
    transportation: list[str] = Field(default_factory=list)
    local_activities: list[str] = Field(default_factory=list)
    events_and_festivals: list[str] = Field(default_factory=list)
class DestinationSearchResponse(BaseModel):
    success: bool = True
    destination: str
    overview: str
    message: str
    notice: str = "Verify changing details with official local sources."

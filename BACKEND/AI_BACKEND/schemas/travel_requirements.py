from pydantic import BaseModel, Field
class TravelRequirementsRequest(BaseModel):
    destination: str = Field(min_length=2, max_length=120)
    travel_type: str = Field(default="general", max_length=80)

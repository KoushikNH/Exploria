from pydantic import BaseModel, Field, ConfigDict
class RecommendationRequest(BaseModel):
    model_config = ConfigDict(allow_inf_nan=False)
    budget: float = Field(gt=0, le=1_000_000_000)
    interests: list[str] = Field(min_length=1, max_length=20)
    preferred_location: str = Field(default="India", min_length=2, max_length=120)
    travel_days: int = Field(gt=0, le=365)

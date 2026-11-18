from pydantic import BaseModel, Field, ConfigDict
class BudgetRequest(BaseModel):
    model_config = ConfigDict(allow_inf_nan=False)
    total_budget: float = Field(gt=0, le=1_000_000_000)
    transport_cost: float = Field(ge=0, le=1_000_000_000)
    accommodation_cost: float = Field(ge=0, le=1_000_000_000)
    food_cost: float = Field(ge=0, le=1_000_000_000)
    activity_cost: float = Field(ge=0, le=1_000_000_000)
    other_cost: float = Field(default=0, ge=0, le=1_000_000_000)
class BudgetResponse(BaseModel):
    success: bool = True
    total_budget: float
    total_expenses: float
    remaining_budget: float
    usage_percentage: float
    status: str

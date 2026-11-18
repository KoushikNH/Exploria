from pydantic import BaseModel, Field, field_validator, ConfigDict
class ExpenseSplitRequest(BaseModel):
    model_config = ConfigDict(allow_inf_nan=False)
    total_expense: float = Field(gt=0, le=1_000_000_000)
    members: list[str] = Field(min_length=1, max_length=50)
    @field_validator("members")
    @classmethod
    def clean_names(cls, values: list[str]) -> list[str]:
        cleaned = [v.strip() for v in values]
        if any(not v for v in cleaned): raise ValueError("Member names cannot be empty")
        if len({v.casefold() for v in cleaned}) != len(cleaned): raise ValueError("Member names must be unique")
        return cleaned
class ExpenseSplitResponse(BaseModel):
    success: bool = True
    total_expense: float
    number_of_members: int
    amount_per_person: float
    individual_shares: list[dict]

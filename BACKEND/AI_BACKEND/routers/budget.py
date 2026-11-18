from fastapi import APIRouter
from schemas.budget import BudgetRequest
from services.budget_service import analyze_budget
router = APIRouter(prefix="/budget", tags=["Travel Budget Analysis"])
@router.get("/")
def budget_home(): return {"success": True, "message": "Exploria Travel Budget API is ready."}
@router.post("/analyze")
def budget_analyze(data: BudgetRequest):
    result = analyze_budget(data.total_budget, data.transport_cost, data.accommodation_cost, data.food_cost, data.activity_cost, data.other_cost)
    return {"success": True, **result}

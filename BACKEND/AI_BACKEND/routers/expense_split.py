from fastapi import APIRouter, HTTPException
from schemas.expense_split import ExpenseSplitRequest
from services.expense_service import split_equally
router = APIRouter(prefix="/expense-split", tags=["Group Expense Splitting"])
@router.get("/")
def expense_split_home(): return {"success": True, "message": "Exploria Group Expense Split API is ready."}
@router.post("/calculate")
def calculate_expense_split(data: ExpenseSplitRequest):
    try: return {"success": True, **split_equally(data.total_expense, data.members)}
    except ValueError as exc: raise HTTPException(status_code=422, detail=str(exc)) from exc

from decimal import Decimal, ROUND_HALF_UP
def analyze_budget(total_budget: float, transport_cost: float, accommodation_cost: float, food_cost: float, activity_cost: float, other_cost: float = 0) -> dict:
    budget = Decimal(str(total_budget))
    expenses = sum((Decimal(str(v)) for v in (transport_cost, accommodation_cost, food_cost, activity_cost, other_cost)), Decimal("0"))
    remaining = budget - expenses
    usage = (expenses / budget * Decimal("100"))
    money = lambda x: float(x.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
    status = "Over Budget" if remaining < 0 else ("Budget Almost Used" if usage >= 80 else "Within Budget")
    return {"total_budget": money(budget), "total_expenses": money(expenses), "remaining_budget": money(remaining), "usage_percentage": float(usage.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)), "status": status}

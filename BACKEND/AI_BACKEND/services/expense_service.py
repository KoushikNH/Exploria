from decimal import Decimal, ROUND_DOWN, ROUND_HALF_UP
def split_equally(total_expense: float, members: list[str]) -> dict:
    amount = Decimal(str(total_expense))
    names = [name.strip() for name in members]
    if amount <= 0: raise ValueError("total_expense must be greater than zero")
    if not names or any(not n for n in names): raise ValueError("Every member must have a name")
    if len({n.casefold() for n in names}) != len(names): raise ValueError("Member names must be unique")
    cents = (amount * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    base_cents, remainder = divmod(int(cents), len(names))
    shares = [base_cents + (1 if i < remainder else 0) for i in range(len(names))]
    fmt = lambda c: float((Decimal(c) / 100).quantize(Decimal("0.01")))
    return {"total_expense": fmt(int(cents)), "number_of_members": len(names), "amount_per_person": fmt(base_cents), "individual_shares": [{"member": n, "amount_to_pay": fmt(s)} for n,s in zip(names, shares)], "note": "Any indivisible cents are assigned one by one so the shares add up exactly to the total."}

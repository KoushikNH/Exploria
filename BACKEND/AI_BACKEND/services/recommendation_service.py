from .ai_service import generate_travel_response
def recommend_destinations(budget: float, interests: list[str], preferred_location: str, travel_days: int) -> str:
    prompt = (f"Suggest destinations in or near {preferred_location}. Total budget: {budget}; trip length: {travel_days} days; interests: {', '.join(interests)}. Explain why each may fit and give broad planning tips. Do not guarantee current prices or availability; state that estimates need checking.")
    return generate_travel_response("You are a practical travel inspiration assistant. Be transparent about estimates.", prompt)

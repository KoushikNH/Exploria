from .ai_service import generate_travel_response
def create_travel_checklist(destination: str, travel_type: str = "general") -> str:
    prompt = (f"Create a general preparation checklist for travel to {destination}. Travel type: {travel_type}. Separate general packing/planning suggestions from official entry requirements. Do not state visa, permit, health or entry rules as facts; direct travellers to the relevant government or official sources.")
    return generate_travel_response("You are a safety-conscious travel planning assistant. Never invent official requirements.", prompt)

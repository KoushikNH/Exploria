from .ai_service import generate_travel_response
SYSTEM_PROMPT = ("You are Exploria, a helpful travel-planning assistant. Do not invent live prices, opening hours, events, visa rules, weather, emergency numbers, or official restrictions. Clearly say when information needs checking with an official source.")
def answer_travel_question(message: str) -> str:
    return generate_travel_response(SYSTEM_PROMPT, message)

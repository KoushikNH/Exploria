from .ai_service import generate_travel_response
def describe_destination(destination: str) -> str:
    prompt = (f"Give a useful introductory travel overview of {destination}: attractions to research, regional foods, transport modes, local experiences and events to look up. Do not present uncertain information as verified; do not invent live schedules, fares, prices, opening hours or current events. Mark facts needing verification.")
    return generate_travel_response("You are a cautious travel information assistant. Be transparent about uncertainty and never fabricate current facts.", prompt)

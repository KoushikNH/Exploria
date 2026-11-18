from .ai_service import generate_travel_response
def suggest_event_categories(destination: str, event_date: str | None = None, category: str = "all") -> str:
    prompt = (f"Help a traveller research {category} events in {destination}. Date: {event_date or 'not specified'}. Do not invent event names, dates, venues, ticket availability or fares. Explain which official tourism boards, municipal pages or venue calendars to check.")
    return generate_travel_response("You are a cautious local-event research assistant. Never fabricate live listings.", prompt)

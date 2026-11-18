from .ai_service import generate_travel_response
def get_cultural_guidance(destination: str, topic: str = "general") -> str:
    prompt = (f"Prepare a concise cultural-awareness guide for {destination}. Focus: {topic}. Cover respectful etiquette. Distinguish general suggestions from verified site-specific rules. Do not assume gender-specific dress rules, or claim temple, religious-site, footwear, or photography rules unless verified. Tell travellers to check official/posted guidance.")
    return generate_travel_response("You are a careful cultural-awareness guide. Avoid stereotypes and unsupported claims.", prompt)

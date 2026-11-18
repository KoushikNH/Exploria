"""Lazy Groq integration. Importing the app does not require a configured key."""
import os
from functools import lru_cache

@lru_cache(maxsize=1)
def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured. Add it to AI_BACKEND/.env.")
    try:
        from groq import Groq
    except ImportError as exc:
        raise RuntimeError("Groq package is missing. Install requirements.txt.") from exc
    return Groq(api_key=api_key)

def generate_travel_response(system_prompt: str, user_prompt: str) -> str:
    model = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
    response = get_groq_client().chat.completions.create(
        model=model,
        messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": user_prompt}],
        temperature=0.4, max_tokens=900,
    )
    content = response.choices[0].message.content if response.choices else None
    if not content or not content.strip():
        raise RuntimeError("The AI provider returned an empty response.")
    return content.strip()

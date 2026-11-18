# Exploria services

These service functions are called by the API routers.

- `ai_service.py`: shared lazy Groq client; reads `GROQ_API_KEY` and optional `GROQ_MODEL`.
- `chatbot_service.py`: travel chatbot response.
- `cultural_service.py`: cultural-awareness guidance.
- `budget_service.py`: deterministic budget arithmetic (no AI required).
- `expense_service.py`: penny-accurate equal group-expense split (no AI required).
- `recommendation_service.py`: AI-assisted destination inspiration.
- `destination_service.py`: destination overview.
- `events_service.py`: event-research guidance; does not provide live listings.
- `travel_requirements_service.py`: general checklist; does not replace official requirements.

## AI configuration

Install from the backend directory:

```powershell
pip install -r requirements.txt
```

Set these values in `AI_BACKEND/.env` (keep the real key private):

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-20b
```

The Groq client is created only when an AI request is made, so the app can start without a key. AI endpoints return HTTP 503 until a valid Groq key and provider connection are available.

**Accuracy note:** AI-generated travel information is not verified live data. Confirm official travel requirements, current event details, schedules, prices and local restrictions with authoritative sources.

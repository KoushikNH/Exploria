from datetime import date
from fastapi import APIRouter, HTTPException, Query
from services.events_service import suggest_event_categories
router = APIRouter(prefix="/events", tags=["Local Events and Festivals"])
@router.get("/")
def events_home(): return {"success": True, "message": "Exploria Local Events research API is ready."}
@router.get("/search")
def search_events(destination: str = Query(..., min_length=2, max_length=120), event_date: date | None = None, category: str = Query(default="all", max_length=80)):
    name = destination.strip()
    try: guidance = suggest_event_categories(name, event_date.isoformat() if event_date else None, category)
    except Exception as exc: raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server configuration.") from exc
    return {"success": True, "destination": name, "event_date": event_date.isoformat() if event_date else "Any date", "category": category, "research_guidance": guidance, "notice": "This endpoint does not provide verified live event listings."}
@router.get("/categories")
def event_categories(): return {"success": True, "categories": ["Festivals", "Cultural Programs", "Fairs and Exhibitions", "Music Events", "Dance Events", "Seasonal Celebrations"]}

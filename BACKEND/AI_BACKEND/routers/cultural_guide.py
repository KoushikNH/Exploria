from fastapi import APIRouter, HTTPException, Query
from schemas.cultural import CulturalGuideRequest
from services.cultural_service import get_cultural_guidance
router = APIRouter(prefix="/cultural-guide", tags=["Cultural Guide"])
@router.get("/")
def cultural_guide_home(): return {"success": True, "message": "Exploria Cultural Guide is ready."}
def _cultural_response(destination: str, topic: str):
    try:
        guidance = get_cultural_guidance(destination.strip(), topic.strip())
    except Exception as exc:
        raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server configuration.") from exc
    return {"success": True, "destination": destination.strip(), "topic": topic.strip(), "guidance": guidance, "notice": "Confirm site-specific rules with official or on-site sources."}

@router.post("/destination")
def cultural_information(data: CulturalGuideRequest):
    return _cultural_response(data.destination, data.topic)

@router.get("/destination", include_in_schema=False)
def cultural_information_legacy(destination: str = Query(..., min_length=2, max_length=120), topic: str = Query(default="general", max_length=80)):
    """Compatibility route for the earlier query-string contract."""
    return _cultural_response(destination, topic)

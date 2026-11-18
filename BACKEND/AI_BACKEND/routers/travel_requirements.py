from fastapi import APIRouter, HTTPException, Query
from schemas.travel_requirements import TravelRequirementsRequest
from services.travel_requirements_service import create_travel_checklist
router = APIRouter(prefix="/travel-requirements", tags=["Travel Requirements"])
@router.get("/")
def travel_requirements_home(): return {"success": True, "message": "Exploria Travel Requirements assistant is ready."}
def _requirements_response(destination: str, travel_type: str):
    try:
        checklist = create_travel_checklist(destination.strip(), travel_type.strip())
    except Exception as exc:
        raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server configuration.") from exc
    return {"success": True, "destination": destination.strip(), "travel_type": travel_type.strip(), "checklist": checklist, "notice": "Verify official entry, permit and health requirements with government sources."}

@router.post("/check")
def check_travel_requirements(data: TravelRequirementsRequest):
    return _requirements_response(data.destination, data.travel_type)

@router.get("/check", include_in_schema=False)
def check_travel_requirements_legacy(destination: str = Query(..., min_length=2, max_length=120), travel_type: str = Query(default="general", max_length=80)):
    """Compatibility route for the earlier query-string contract."""
    return _requirements_response(destination, travel_type)
@router.get("/categories")
def requirement_categories(): return {"success": True, "categories": ["Travel Documents", "Weather Preparation", "Clothing Guidelines", "Transportation", "Local Guidelines", "Safety Information", "Emergency Contacts"]}

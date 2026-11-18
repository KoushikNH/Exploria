from fastapi import APIRouter, HTTPException, Query
from services.destination_service import describe_destination
router = APIRouter(prefix="/destinations", tags=["Destination Explorer"])
@router.get("/")
def destination_home(): return {"success": True, "message": "Exploria Destination Explorer is ready."}
@router.get("/search")
def search_destination(destination: str = Query(..., min_length=2, max_length=120)):
    name = destination.strip()
    try: overview = describe_destination(name)
    except Exception as exc: raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server configuration.") from exc
    return {"success": True, "destination": name, "overview": overview, "message": f"Travel overview generated for {name}", "notice": "Verify changing details with official local sources."}
@router.get("/categories")
def destination_categories(): return {"success": True, "categories": ["Tourist Attractions", "Popular Food", "Accommodation", "Transportation", "Local Activities", "Events and Festivals"]}

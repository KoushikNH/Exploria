from fastapi import APIRouter, HTTPException
from schemas.recommendations import RecommendationRequest
from services.recommendation_service import recommend_destinations
router = APIRouter(prefix="/recommendations", tags=["Travel Recommendations"])
@router.get("/")
def recommendations_home(): return {"success": True, "message": "Exploria Travel Recommendations is ready."}
@router.post("/suggest")
def suggest_destinations(data: RecommendationRequest):
    try: suggestions = recommend_destinations(data.budget, data.interests, data.preferred_location, data.travel_days)
    except Exception as exc: raise HTTPException(status_code=503, detail="AI service is unavailable. Check the server configuration.") from exc
    return {"success": True, "travel_preferences": data.model_dump(), "recommendations": suggestions, "notice": "Recommendations are AI-generated; verify prices and availability independently."}

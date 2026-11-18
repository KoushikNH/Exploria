from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

import main
from database.connection import engine
from models import Destination, Experience, User


def test_health_and_openapi():
    with TestClient(main.app) as client:
        assert client.get("/health").status_code == 200
        spec = client.get("/openapi.json").json()
        assert "/chatbot/ask" in spec["paths"]
        assert "/budget/analyze" in spec["paths"]


def test_budget_and_validation():
    with TestClient(main.app) as client:
        response = client.post("/budget/analyze", json={
            "total_budget": 10000, "transport_cost": 1000,
            "accommodation_cost": 3000, "food_cost": 2000,
            "activity_cost": 1500, "other_cost": 500,
        })
        assert response.status_code == 200
        assert response.json()["remaining_budget"] == 2000
        assert client.post("/budget/analyze", json={
            "total_budget": 0, "transport_cost": 0,
            "accommodation_cost": 0, "food_cost": 0, "activity_cost": 0,
        }).status_code == 422


def test_expense_split_remainder_and_validation():
    with TestClient(main.app) as client:
        response = client.post("/expense-split/calculate", json={
            "total_expense": 100, "members": ["A", "B", "C"]
        })
        assert response.status_code == 200
        shares = [x["amount_to_pay"] for x in response.json()["individual_shares"]]
        assert shares == [33.34, 33.33, 33.33]
        assert round(sum(shares), 2) == 100
        assert client.post("/expense-split/calculate", json={
            "total_expense": 100, "members": ["A", " a "]
        }).status_code == 422


def test_ai_endpoint_success_and_unavailable():
    with patch("routers.chatbot.answer_travel_question", return_value="Try Hampi."):
        with TestClient(main.app) as client:
            response = client.post("/chatbot/ask", json={"message": "Where should I go?"})
            assert response.status_code == 200
            assert response.json()["response"] == "Try Hampi."
    with patch("routers.chatbot.answer_travel_question", side_effect=RuntimeError("provider unavailable")):
        with TestClient(main.app) as client:
            assert client.post("/chatbot/ask", json={"message": "Hello"}).status_code == 503


def test_cultural_guide_mock_and_legacy_route():
    with patch("routers.cultural_guide.get_cultural_guidance", return_value="Follow posted rules."):
        with TestClient(main.app) as client:
            response = client.post("/cultural-guide/destination", json={
                "destination": "Hampi", "topic": "customs"
            })
            assert response.status_code == 200
            assert response.json()["guidance"] == "Follow posted rules."
            legacy = client.get("/cultural-guide/destination?destination=Hampi")
            assert legacy.status_code == 200


def test_database_relationships_and_cascade_delete():
    with Session(engine) as db:
        user = User(full_name="Temporary Host", email="temp-host-test@example.invalid",
                    password_hash="test-hash", role="local_host")
        destination = Destination(name="Temporary Place", city="Test City", state="Test State")
        db.add_all([user, destination])
        db.flush()
        experience = Experience(title="Temporary Walk", description="Test", category="heritage",
                                duration_hours=2, price_per_person=100, max_group_size=5,
                                host_id=user.id, destination_id=destination.id)
        db.add(experience)
        db.commit()
        assert experience.host.full_name == "Temporary Host"
        assert experience.destination.name == "Temporary Place"
        db.delete(user)
        db.delete(destination)
        db.commit()
        assert db.query(Experience).filter_by(title="Temporary Walk").count() == 0


def test_all_remaining_ai_routes_with_mocked_services():
    with patch("routers.destination.describe_destination", return_value="A destination overview."), \
         patch("routers.events.suggest_event_categories", return_value="Check official listings."), \
         patch("routers.recommendations.recommend_destinations", return_value="Try nearby heritage sites."), \
         patch("routers.travel_requirements.create_travel_checklist", return_value="Carry required documents."):
        with TestClient(main.app) as client:
            assert client.get("/destinations/search?destination=Hampi").status_code == 200
            assert client.get("/events/search?destination=Hampi").status_code == 200
            assert client.post("/recommendations/suggest", json={
                "budget": 5000, "interests": ["history"], "preferred_location": "Karnataka", "travel_days": 2
            }).status_code == 200
            assert client.post("/travel-requirements/check", json={
                "destination": "Hampi", "travel_type": "family"
            }).status_code == 200
            assert client.get("/travel-requirements/check?destination=Hampi").status_code == 200

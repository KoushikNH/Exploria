from contextlib import asynccontextmanager

from fastapi import FastAPI
from database.connection import create_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Exploria AI Backend",
    description="AI services for the Exploria tourism platform",
    version="1.0.0",
    lifespan=lifespan
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Exploria AI Backend",
        "status": "Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Backend"
    }

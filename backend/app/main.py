from fastapi import FastAPI

from backend.app.database import Base, engine
from backend.app.models.persona import Persona

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PersonaOS API",
    version="0.1.0",
    description="AI-powered Digital Persona Platform"
)


@app.get("/")
def root():
    return {
        "product": "PersonaOS",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
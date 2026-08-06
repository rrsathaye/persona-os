from fastapi import FastAPI
from app.database import Base, engine
from app.models.persona import Persona
from app.personas import PersonaSummary, load_personas
from app.routers.ai import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PersonaOS API",
    version="0.1.0",
    description="AI-powered Digital Persona Platform"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ai_router)


@app.get("/personas", response_model=list[PersonaSummary])
def list_personas():
    return [
        PersonaSummary(
            id=persona.id,
            display_name=persona.display_name,
            style_summary=persona.style_summary,
            source_label=persona.source_label,
        )
        for persona in load_personas()
    ]

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

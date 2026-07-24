from fastapi import FastAPI
from app.database import Base, engine
from app.models.persona import Persona
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
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(ai_router)

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
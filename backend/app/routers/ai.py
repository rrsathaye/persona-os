from fastapi import APIRouter, HTTPException

from app.schemas.ai import (
    GenerateDraftRequest,
    GenerateDraftResponse,
)

from app.services.ai.ai_service import AIService
from app.personas import PersonaNotFoundError

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)

ai_service = AIService()


@router.post(
    "/generate",
    response_model=GenerateDraftResponse,
)
def generate(
    request: GenerateDraftRequest,
):

    try:
        draft = ai_service.generate_draft(request)
    except PersonaNotFoundError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        ) from error

    return GenerateDraftResponse(
        draft=draft,
    )

from fastapi import APIRouter

from app.schemas.ai import (
    GenerateDraftRequest,
    GenerateDraftResponse,
)

from app.services.ai.ai_service import AIService

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

    draft = ai_service.generate_draft(
        writing_type=request.writing_type,
        context=request.context,
        communication_mix=request.communication_mix,
    )

    return GenerateDraftResponse(
        draft=draft,
    )
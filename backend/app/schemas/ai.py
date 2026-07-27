from app.schemas.communication_style import CommunicationStyle
from app.schemas.screen_snapshot import ScreenSnapshot

from pydantic import BaseModel


class GenerateDraftRequest(BaseModel):
    persona_id: str
    intent: str

    # Communication style sliders
    communication_style: CommunicationStyle

    # Platform-neutral screen context
    screen_snapshot: ScreenSnapshot


class GenerateDraftResponse(BaseModel):
    draft: str
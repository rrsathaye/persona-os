from pydantic import BaseModel

from app.schemas.communication_style import CommunicationStyle
from app.schemas.screen_snapshot import ScreenSnapshot


class GenerateDraftRequest(BaseModel):
    persona_id: str
    intent: str
    communication_style: CommunicationStyle
    screen_snapshot: ScreenSnapshot


class GenerateDraftResponse(BaseModel):
    draft: str

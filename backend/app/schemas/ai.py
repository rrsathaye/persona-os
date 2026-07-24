from pydantic import BaseModel


class GenerateDraftRequest(BaseModel):
    writing_type: str
    context: str
    communication_mix: dict


class GenerateDraftResponse(BaseModel):
    draft: str
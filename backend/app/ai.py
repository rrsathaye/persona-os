from pydantic import BaseModel


class GenerateDraftRequest(BaseModel):
    writing_type: str
    context: str
    communication_style: dict


class GenerateDraftResponse(BaseModel):
    draft: str
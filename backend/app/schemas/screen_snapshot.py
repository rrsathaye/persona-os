from typing import List, Optional

from pydantic import BaseModel, Field


class ScreenElement(BaseModel):
    text: Optional[str] = None
    content_description: Optional[str] = None
    class_name: str
    clickable: bool
    bounds: str


class ScreenSnapshot(BaseModel):
    application: str
    page_type: str

    title: Optional[str] = None

    elements: List[ScreenElement] = Field(default_factory=list)
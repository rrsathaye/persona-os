from typing import List

from pydantic import BaseModel


class StyleDimension(BaseModel):
    id: str
    leftLabel: str
    rightLabel: str
    balance: int


class CommunicationStyle(BaseModel):
    dimensions: List[StyleDimension]
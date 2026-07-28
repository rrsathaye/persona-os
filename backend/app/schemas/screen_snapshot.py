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
    body: Optional[str] = None
    subreddit: Optional[str] = None
    author: Optional[str] = None
    posted_time: Optional[str] = None
    votes: Optional[int] = None
    comments: Optional[int] = None
    shares: Optional[int] = None
    reply_available: bool = False
    visible_comments: List[str] = Field(default_factory=list)

    elements: List[ScreenElement] = Field(default_factory=list)

from sqlalchemy import Boolean, Column, Integer, String

from app.database import Base


class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True, nullable=False)

    tone = Column(String, nullable=False)

    writing_style = Column(String, nullable=True)

    emoji_usage = Column(Boolean, default=False)

    active = Column(Boolean, default=True)
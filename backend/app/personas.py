import json
from functools import lru_cache
from pathlib import Path
from typing import List

from pydantic import BaseModel, ConfigDict, Field, TypeAdapter, field_validator


CATALOG_PATH = Path(__file__).resolve().parents[2] / "personas" / "personas.json"


class PersonaNotFoundError(ValueError):
    pass


class Persona(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str = Field(min_length=1)
    display_name: str = Field(min_length=1)
    style_summary: str = Field(min_length=1)
    source_label: str = Field(min_length=1)
    system_prompt: str = Field(min_length=1)
    writing_examples: List[str] = Field(min_length=3, max_length=4)

    @field_validator(
        "id",
        "display_name",
        "style_summary",
        "source_label",
        "system_prompt",
    )
    @classmethod
    def value_must_not_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("value must not be blank")
        return value

    @field_validator("writing_examples")
    @classmethod
    def examples_must_not_be_blank(cls, examples: List[str]) -> List[str]:
        if any(not example.strip() for example in examples):
            raise ValueError("writing examples must not be blank")
        return examples


class PersonaSummary(BaseModel):
    id: str
    display_name: str
    style_summary: str
    source_label: str


@lru_cache(maxsize=1)
def load_personas() -> tuple[Persona, ...]:
    with CATALOG_PATH.open(encoding="utf-8") as catalog_file:
        raw_catalog = json.load(catalog_file)

    personas = TypeAdapter(List[Persona]).validate_python(raw_catalog)
    ids = [persona.id for persona in personas]

    if len(ids) != len(set(ids)):
        raise ValueError("persona IDs must be unique")

    return tuple(personas)


def get_persona(persona_id: str) -> Persona:
    for persona in load_personas():
        if persona.id == persona_id:
            return persona

    raise PersonaNotFoundError(f"Unknown persona_id: {persona_id}")

from openai import OpenAI

from app.config import OPENAI_API_KEY, OPENAI_MODEL


class OpenAIProvider:
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        self.model = OPENAI_MODEL

    def generate(self, prompt: str) -> str:
        response = self.client.responses.create(
            model=self.model,
            input=prompt,
        )

        return response.output_text
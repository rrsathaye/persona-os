from app.config import AI_PROVIDER
from app.services.ai.mock_provider import MockProvider
from app.services.ai.openai_provider import OpenAIProvider


class ProviderFactory:

    @staticmethod
    def get_provider():

        if AI_PROVIDER.lower() == "openai":
            return OpenAIProvider()

        return MockProvider()
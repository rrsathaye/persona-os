from app.services.ai.prompt_builder import PromptBuilder
from app.services.ai.provider_factory import ProviderFactory


class AIService:

    def __init__(self):
        self.provider = ProviderFactory.get_provider()

    def generate_draft(
        self,
        writing_type: str,
        context: str,
        communication_mix: dict,
    ) -> str:

        prompt = PromptBuilder.build(
            writing_type=writing_type,
            context=context,
            communication_mix=communication_mix,
        )

        return self.provider.generate(prompt)
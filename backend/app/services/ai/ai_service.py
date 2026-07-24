from app.services.ai.prompt_builder import PromptBuilder
from app.services.ai.provider_factory import ProviderFactory


class AIService:

    def __init__(self):
        self.provider = ProviderFactory.get_provider()

    def generate_draft(
        self,
        writing_type: str,
        context: str,
        communication_style: dict,
    ) -> str:

        prompt = PromptBuilder.build(
            writing_type=writing_type,
            context=context,
            communication_style=communication_style,
        )

        print("\n" + "=" * 80)
        print("PROMPT SENT TO AI")
        print("=" * 80)
        print(prompt)
        print("=" * 80 + "\n")

        return self.provider.generate(prompt)
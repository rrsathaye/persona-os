from app.schemas.ai import GenerateDraftRequest
from app.services.ai.prompt_builder import PromptBuilder
from app.services.ai.provider_factory import ProviderFactory


class AIService:

    def __init__(self):
        self.provider = ProviderFactory.get_provider()

    def generate_draft(
        self,
        request: GenerateDraftRequest,
    ) -> str:

        prompt = PromptBuilder.build(request)

        print("\n" + "=" * 80)
        print("PROMPT SENT TO AI")
        print("=" * 80)
        print(prompt)
        print("=" * 80 + "\n")

        return self.provider.generate(prompt)
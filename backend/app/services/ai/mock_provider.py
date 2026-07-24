
import time

class MockProvider:

    def generate(self, prompt: str) -> str:

        time.sleep(2)

        return (
            "I don't think AI will replace Product Managers. "
            "The best PMs use AI to understand customers faster, "
            "validate ideas quicker, and communicate more effectively. "
            "AI is a powerful assistant, but product thinking, prioritization, "
            "and stakeholder management remain fundamentally human skills."
        )
from textwrap import dedent


class PromptBuilder:

    @staticmethod
    def build(
        writing_type: str,
        context: str,
        communication_mix: dict,
    ) -> str:

        return dedent(f"""
        You are writing on behalf of the user.

        Generate exactly one {writing_type}.

        Communication Style:
        - Professional: {communication_mix.get("professional", 50)}%
        - Friendly: {communication_mix.get("friendly", 50)}%
        - Concise: {communication_mix.get("concise", 50)}%
        - Expressive: {communication_mix.get("expressive", 50)}%

        Context:
        {context}

        Write naturally.
        Do not explain your reasoning.
        Return only the final draft.
        """).strip()
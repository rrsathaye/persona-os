from textwrap import dedent


class PromptBuilder:

    @staticmethod
    def build(
        writing_type: str,
        context: str,
        communication_style: dict,
    ) -> str:

        style_lines = []

        for dimension in communication_style.get("dimensions", []):
            left = dimension["leftLabel"]
            right = dimension["rightLabel"]
            balance = dimension["balance"]

            left_percentage = 100 - balance
            right_percentage = balance

            style_lines.append(f"- {left}: {left_percentage}%")
            style_lines.append(f"- {right}: {right_percentage}%")

        communication_section = "\n".join(style_lines)

        return dedent(f"""
        You are writing on behalf of the user.

        Generate exactly one {writing_type}.

        Communication Style:
        {communication_section}

        Context:
        {context}

        Write naturally.
        Do not explain your reasoning.
        Return only the final draft.
        """).strip()
from textwrap import dedent

from app.schemas.ai import GenerateDraftRequest


class PromptBuilder:

    @staticmethod
    def build(request: GenerateDraftRequest) -> str:

        communication_style = request.communication_style

        style_lines = []

        for dimension in communication_style.dimensions:
            left = dimension.leftLabel
            right = dimension.rightLabel
            balance = dimension.balance

            left_percentage = 100 - balance
            right_percentage = balance

            style_lines.append(f"- {left}: {left_percentage}%")
            style_lines.append(f"- {right}: {right_percentage}%")

        communication_section = "\n".join(style_lines)

        snapshot = request.screen_snapshot

        elements = []

        for element in snapshot.elements:
            elements.append(
                dedent(
                    f"""
                    Text: {element.text or ""}
                    Content Description: {element.content_description or ""}
                    Class: {element.class_name}
                    Clickable: {element.clickable}
                    Bounds: {element.bounds}
                    """
                ).strip()
            )

        elements_section = "\n\n".join(elements) if elements else "No UI elements captured."
        comments_section = (
            "\n".join(f"- {comment}" for comment in snapshot.visible_comments)
            if snapshot.visible_comments
            else "No comments were captured."
        )

        return dedent(
            f"""
            You are writing on behalf of the user.

            Persona:
            {request.persona_id}

            Intent:
            {request.intent}

            Communication Style:
            {communication_section}

            Application:
            {snapshot.application}

            Page Type:
            {snapshot.page_type}

            Screen Title:
            {snapshot.title or ""}

            Subreddit:
            {snapshot.subreddit or ""}

            Post Author:
            {snapshot.author or ""}

            Post Body:
            {snapshot.body or ""}

            Visible Comments:
            {comments_section}

            Visible Screen Elements:
            {elements_section}

            Understand what is currently visible on the user's screen.

            Infer the appropriate context from the UI elements.

            Generate exactly one response.

            Match the requested communication style.

            Be helpful, natural and authentic.

            Do not explain your reasoning.

            Return only the final response.
            """
        ).strip()

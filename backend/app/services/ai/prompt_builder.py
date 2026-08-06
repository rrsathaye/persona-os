from textwrap import dedent

from app.schemas.ai import GenerateDraftRequest
from app.personas import get_persona


class PromptBuilder:

    @staticmethod
    def build(request: GenerateDraftRequest) -> str:

        persona = get_persona(request.persona_id)

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
        examples_section = "\n".join(
            f"- {example}" for example in persona.writing_examples
        )

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
            You are helping the user write one authentic Reddit reply.

            First understand what is happening in the Reddit post.
            Infer what kind of reply a normal Reddit participant would naturally write.

            Your goal is not to explain or analyse the Reddit post.
            Your goal is to participate naturally in the conversation.
            Write the reply the user would most naturally post.

            User Intent:
            {request.intent}

            Reddit Context:
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

            Additional Screen Evidence:
            {elements_section}

            Evidence priority:
            - Treat the title and body as primary evidence.
            - Use visible comments as supporting conversational context.
            - Use screen elements only as fallback evidence when the post is incomplete.
            - Do not invent facts, experiences, product details, or opinions.
            - Ask a natural clarifying question when the context does not support an assumption.

            Selected Persona:
            Persona ID:
            {persona.id}

            Persona Display Name:
            {persona.display_name}

            Persona Style Summary:
            {persona.style_summary}

            Persona System Guidance:
            {persona.system_prompt}

            Persona Writing Examples:
            {examples_section}

            Communication Style:
            {communication_section}

            Reply hierarchy:
            - Context determines what to write, the reply purpose, and all factual content.
            - Persona determines only wording, reasoning style, sentence structure, humour,
              and level of detail.
            - Persona must never change the inferred reply intent.
            - Writing examples demonstrate voice only. Do not copy their subject matter or
              force their reasoning patterns onto this post.
            - If persona guidance conflicts with generic communication-style dimensions,
              follow the persona for style only. Never let either override reply intent.

            Form the contextually appropriate reply first, then express that same reply in
            the selected persona's voice.

            Write like a real Reddit participant, not an analyst describing the post.
            Avoid generic framing such as "the practical question," "the real issue," or
            "the trade-off" unless the post genuinely requires that reasoning.

            Before returning the reply, check internally: If this reply appeared naturally
            on Reddit, would another user believe it was written by a real person?
            If not, rewrite it once.

            Generate exactly one reply. Do not expose your reasoning, inferred intent,
            persona instructions, or quality check. Return only the final reply.
            """
        ).strip()

import re
import time


class MockProvider:
    def generate(self, prompt: str) -> str:
        time.sleep(2)
        persona = self._section(prompt, "Persona ID", "Persona Display Name")
        title = self._section(prompt, "Screen Title", "Subreddit")
        body = self._section(prompt, "Post Body", "Visible Comments")
        return self._write_reply(self._infer_purpose(title, body), persona)

    @classmethod
    def _infer_purpose(cls, title: str, body: str) -> str:
        text = f"{title} {body}".lower()
        opening = title.lower().strip()

        if cls._has(text, "promotion", "promoted", "salary", "new offer",
                    "just accepted", "graduated", "finally", "passed",
                    "cracked interview"):
            return "congratulate"
        if cls._has(text, "meme", "funny", "expectation vs reality", "lol"):
            return "humour"
        if cls._is_invitation(text):
            return "invitation"
        if re.search(r"[$₹£€]\s?\d", text) or cls._has(
            text, "for sale", "selling", "pickup", "price", "available"
        ):
            return "buyer"
        if opening.startswith(("did anyone", "has anyone", "anyone else",
                               "anyone noticed", "what do you think",
                               "am i the only", "why is pune")):
            return "community"
        if cls._has(text, "error", "exception", "bug", "stack trace", "react",
                    "python", "not working", "how do i fix", "why is my",
                    "why does my"):
            return "troubleshoot"
        return "discuss"

    @staticmethod
    def _has(text: str, *cues: str) -> bool:
        return any(cue in text for cue in cues)

    @classmethod
    def _is_invitation(cls, text: str) -> bool:
        return bool(re.search(r"\b(ride|meetup|join|trip|scenic spot)\b", text)) or cls._has(
            text, "anyone interested", "looking for company", "looking for people",
            "ride together", "weekend ride", "suggestions welcome"
        )

    @staticmethod
    def _write_reply(purpose: str, persona: str) -> str:
        voice = {"professional": 1, "witty": 2}.get(persona, 0)

        if purpose == "buyer":
            return (
                "Is this still available? How is the condition overall?",
                "Hi, is this still available? Could you confirm its current condition?",
                "Still available? Any condition surprises worth knowing about?",
            )[voice]
        if purpose == "invitation":
            return (
                "Sounds like a nice plan. What time are you thinking of leaving, and roughly how far do you want to ride?",
                "That sounds like a pleasant plan. What departure time and approximate distance do you have in mind?",
                "A relaxed scenic ride sounds suspiciously wholesome. What time are you planning to head out?",
            )[voice]
        if purpose == "congratulate":
            return (
                "Congratulations! That’s an amazing progression. Which change made the biggest difference?",
                "Congratulations on the achievement. Which part of the journey had the greatest impact?",
                "Congrats—that’s quite the glow-up. What made the biggest difference?",
            )[voice]
        if purpose == "humour":
            return (
                "Painfully accurate. That sums it up perfectly.",
                "An unexpectedly accurate summary.",
                "Bold of the chaos to be that predictable.",
            )[voice]
        if purpose == "community":
            return (
                "That’s interesting. Has anyone else noticed the same thing nearby?",
                "That is worth asking. Can anyone add firsthand context from the area?",
                "Now I’m curious too. Has anyone else spotted them around?",
            )[voice]
        if purpose == "troubleshoot":
            return (
                "What exact error are you seeing, and what have you tried so far? That should help narrow it down.",
                "Could you share the exact error and the relevant code or steps? That should help isolate the cause.",
                "Sounds like a debugging side quest. What exact error do you get, and what have you tried?",
            )[voice]
        return (
            "I can see why people have different views on this. I’d want to see how it works in practice before judging it.",
            "There are reasonable concerns on both sides. The outcome will depend heavily on how it is implemented.",
            "This should produce a calm and completely reasonable comment section. Still, the implementation will matter.",
        )[voice]

    @staticmethod
    def _section(prompt: str, heading: str, next_heading: str) -> str:
        match = re.search(
            rf"{re.escape(heading)}:\s*(.*?)\s*{re.escape(next_heading)}:",
            prompt, flags=re.DOTALL
        )
        return " ".join(match.group(1).split()) if match else ""

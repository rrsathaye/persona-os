import unittest

from fastapi.testclient import TestClient

from app.main import app
from app.personas import load_personas


REQUEST = {
    "persona_id": "rahul",
    "intent": "Write a helpful reply.",
    "communication_style": {
        "dimensions": [
            {
                "id": "tone",
                "leftLabel": "Formal",
                "rightLabel": "Casual",
                "balance": 50,
            }
        ]
    },
    "screen_snapshot": {
        "application": "Reddit",
        "page_type": "post",
        "title": "Should I automate our weekly status report?",
        "body": "The team spends two hours copying the same metrics every Friday.",
        "subreddit": "productmanagement",
        "elements": [],
    },
}


class PersonaCatalogTests(unittest.TestCase):
    @staticmethod
    def generate(client, persona_id="rahul", title=None, body=None):
        snapshot = {
            **REQUEST["screen_snapshot"],
            "title": title or REQUEST["screen_snapshot"]["title"],
            "body": body or REQUEST["screen_snapshot"]["body"],
        }
        payload = {
            **REQUEST,
            "persona_id": persona_id,
            "screen_snapshot": snapshot,
        }
        response = client.post("/ai/generate", json=payload)
        return response

    def assert_has_purpose_signal(self, draft, signals):
        normalized = draft.lower()
        self.assertTrue(
            any(signal in normalized for signal in signals),
            msg=f"Draft did not express the expected purpose: {draft}",
        )

    def test_catalog_has_exact_demo_personas_and_valid_examples(self):
        personas = load_personas()

        self.assertEqual(
            [persona.id for persona in personas],
            ["rahul", "professional", "witty"],
        )
        self.assertTrue(
            all(3 <= len(persona.writing_examples) <= 4 for persona in personas)
        )

    def test_personas_endpoint_does_not_expose_private_prompt_data(self):
        response = TestClient(app).get("/personas")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        for persona in response.json():
            self.assertEqual(
                set(persona),
                {"id", "display_name", "style_summary", "source_label"},
            )

    def test_unknown_persona_returns_clear_client_error(self):
        request = {**REQUEST, "persona_id": "missing"}

        response = TestClient(app).post("/ai/generate", json=request)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["detail"], "Unknown persona_id: missing")

    def test_same_post_produces_non_empty_distinct_persona_drafts(self):
        client = TestClient(app)
        drafts = {}

        for persona_id in ("rahul", "professional", "witty"):
            response = self.generate(client, persona_id=persona_id)
            self.assertEqual(response.status_code, 200)
            draft = response.json()["draft"]
            self.assertTrue(draft.strip())
            drafts[persona_id] = draft

        self.assertEqual(len(set(drafts.values())), 3)

    def test_mock_drafts_match_conversational_purpose(self):
        client = TestClient(app)
        scenarios = (
            (
                "marketplace",
                "Kindle Paperwhite for sale - $70",
                "Works well, minor scratch on the back. Pickup downtown.",
                ("available", "condition", "pickup"),
            ),
            (
                "achievement",
                "My salary progressed from $45k to $110k",
                "I changed careers twice and finally accepted a new offer.",
                ("congrat", "achievement", "milestone", "glow-up"),
            ),
            (
                "technical help",
                "Why does my React component keep fetching forever?",
                "It started after I saved the fetched result to state.",
                ("error", "code", "steps", "tried", "debug"),
            ),
            (
                "discussion",
                "Did anyone see these banners near Deccan?",
                "I noticed the same type in two different places today.",
                ("noticed", "firsthand", "curious", "spotted"),
            ),
        )

        for name, title, body, signals in scenarios:
            with self.subTest(name=name):
                response = self.generate(client, title=title, body=body)
                self.assertEqual(response.status_code, 200)
                draft = response.json()["draft"]
                self.assertTrue(draft.strip())
                self.assert_has_purpose_signal(draft, signals)


if __name__ == "__main__":
    unittest.main()

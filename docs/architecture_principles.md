# PersonaOS Architecture Principles

This document captures architectural decisions that are intentionally frozen.
The goal is to prevent future development from blurring responsibilities between
layers or over-engineering components that already satisfy the MVP.

---

# 1. Parser Contract

## Responsibility

The parser's only responsibility is to faithfully capture what is currently
visible on the user's screen and normalize it into a ScreenSnapshot.

It is a data extraction layer.

It is NOT an intelligence layer.

The parser must never attempt to understand meaning or intent.

---

## The parser SHOULD

- Capture only information visible on screen.
- Preserve the structure of the source application.
- Extract obvious metadata when it can be identified reliably.
- Normalize data into the ScreenSnapshot model.
- Fail gracefully when metadata cannot be determined.
- Prefer missing data over incorrect data.

---

## The parser MUST NOT

- Infer user intent.
- Classify Reddit posts.
- Determine conversational purpose.
- Rewrite extracted content.
- Summarize posts.
- Guess hidden or off-screen content.
- Generate AI-friendly text.

Those responsibilities belong to downstream AI layers.

---

# 2. Known Accessibility Limitations

PersonaOS intentionally accepts the following platform limitations.

## Visible content only

Accessibility exposes only what is currently rendered.

PersonaOS will not attempt to reconstruct:

- hidden paragraphs
- collapsed comments
- off-screen replies
- unseen images
- unseen videos

The currently visible screen is treated as the complete context.

---

## Accessibility trees are presentation, not semantics

Android Accessibility exposes UI elements.

It does NOT expose a structured Reddit object.

Extraction therefore relies on heuristics for identifying:

- title
- body
- author
- metadata
- comments

The objective is robustness rather than perfection.

---

## UI changes are expected

Applications evolve.

Accessibility labels, layouts and ordering may change.

The parser should be resilient but must avoid becoming an ever-growing collection
of special cases.

When a real regression appears, fix the regression.

Do not optimize for hypothetical layouts.

---

## Images and videos

Accessibility usually exposes only placeholders such as:

- Image
- Video
- Image 1 of 6

PersonaOS will not attempt OCR or image understanding inside the parser.

Future multimodal AI providers will solve this.

---

# 3. Layer Responsibilities

The architecture intentionally separates extraction from intelligence.

```
Accessibility
        │
        ▼
Parser
        │
        ▼
Normalized ScreenSnapshot
        │
        ▼
AI Provider
        │
        ▼
Context Understanding
        │
        ▼
Persona
        │
        ▼
Generated Draft
```

Every layer has a single responsibility.

The parser extracts.

The AI understands.

The persona writes.

---

# 4. Engineering Principles

When in doubt:

- Capture first.
- Understand later.
- Write last.

Never move AI responsibilities into the parser.

Never make the parser "smart."

Keep every layer focused on a single responsibility.

---

# 5. Freeze Policy

The parser is considered feature complete once it:

- reliably extracts visible content
- produces a stable ScreenSnapshot
- tolerates UI variations reasonably well

Future parser work should be limited to:

- bug fixes
- platform compatibility
- new supported applications

Feature requests that require semantic understanding belong in the AI layer, not
the parser.
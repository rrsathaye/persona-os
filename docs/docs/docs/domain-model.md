# PersonaOS Domain Model

## Overview

PersonaOS is built around a small set of core domain models. These models represent the concepts of the product rather than the implementation. UI components, APIs, connectors, and AI providers all operate on these shared models.

---

# Persona

Represents a user's communication identity.

A persona defines how the user naturally communicates across different platforms and contexts.

### Responsibilities

- Stores communication preferences
- Stores learned writing characteristics
- Can be reused across platforms
- Evolves over time

---

# Communication Style

Represents how a persona prefers to communicate.

A communication style consists of one or more communication dimensions.

---

# Communication Dimension

Represents a balance between two complementary communication traits.

Examples:

- Professional ↔ Casual
- Formal ↔ Friendly
- Concise ↔ Detailed
- Reserved ↔ Expressive

Each dimension stores:

```ts
type CommunicationDimension = {
    id: string;
    leftLabel: string;
    rightLabel: string;
    balance: number; // 0 = 100% left, 100 = 100% right
}
```

Example:

```
Professional: 80%
Casual: 20%
```

---

# Writing Session

Represents a single drafting request.

Contains:

- writing type
- context
- selected persona
- communication style
- generated draft

A Writing Session is temporary and exists only while generating content.

---

# Draft

Represents AI-generated content awaiting user approval.

Lifecycle:

Draft Created
↓
User Reviews
↓
User Edits (optional)
↓
User Approves
↓
Connector Posts Content

---

# Connector

Represents an integration with an external platform.

Examples:

- Reddit
- LinkedIn
- Gmail
- Slack
- WhatsApp

Responsibilities:

- Fetch context
- Submit approved content
- Never generate AI content directly

---

# AI Provider

Represents the underlying LLM.

Examples:

- OpenAI
- Anthropic
- Gemini
- Local LLM

Responsibilities:

- Generate drafts
- Never know about Reddit, LinkedIn, or UI

---

# Design Principles

- Domain models should be platform independent.
- UI should render domain models rather than define them.
- PromptBuilder converts domain models into prompts.
- Connectors consume domain models but do not own them.
- AI providers operate only on prompts and return drafts.
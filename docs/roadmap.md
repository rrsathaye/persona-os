# PersonaOS Roadmap

This document captures the current product roadmap for PersonaOS.

The roadmap is intentionally lightweight and reflects the project's current stage: validating the core experience before adding more complex personalization, memory or cross-platform capabilities.

Items are grouped by their actual status to avoid presenting research ideas as committed features.

---

# ✅ Completed

These capabilities are implemented in the current PersonaOS MVP.

## Core Draft Generation

- FastAPI backend
- `POST /ai/generate` endpoint
- Structured generation requests
- AI-assisted draft generation
- OpenAI provider integration

## Prompting

- Dedicated Prompt Builder
- User intent as prompt input
- Communication style as prompt input
- Screen/context data as prompt input

## AI Provider Architecture

- Provider abstraction
- OpenAI provider implementation
- Provider Factory

This keeps provider-specific logic separate from the rest of the application.

## Web Frontend

- Next.js frontend
- React
- TypeScript
- Tailwind CSS
- Draft-generation workflow
- Communication style controls
- Backend API integration

## Android Context Capture POC

A separate Android Proof of Concept has been created to explore on-screen contextual understanding.

Current implementation includes:

- Android Accessibility Service
- Accessibility tree inspection
- Generic screen analysis
- Reddit-specific analysis
- Reddit parser
- Node filtering
- Node indexing
- ScreenSnapshot model
- ScreenSnapshot builder
- Debug logging

The Android application remains separate from the PersonaOS backend.

---

# 🚧 In Progress

These areas are actively being worked on or validated.

## Reddit Context Extraction

Current work focuses on improving the quality of information extracted from Reddit screens.

Areas under refinement include:

- Subreddit detection
- Comment extraction
- Visible comment identification
- Reply availability
- Screen classification
- Parsing reliability

The objective is to produce a more accurate structured ScreenSnapshot from the visible Reddit interface.

---

## Android Context Quality

Accessibility trees can vary depending on:

- Screen type
- Application version
- Android version
- Visible UI state

Current experimentation focuses on identifying which elements provide useful context and which elements should be ignored.

---

## User-Controlled Learning

PersonaOS is exploring an **Add to Learning** workflow.

The intended principle is:

> Nothing should become part of a user's Persona unless the user explicitly chooses it.

Potential sources may include selected posts, comments or other writing samples.

This capability is not yet implemented as a complete learning system.

---

# 🎯 Next

These are the most realistic next milestones after the current Android context work stabilizes.

## Connect Structured Context to Draft Generation

Investigate how structured context from a ScreenSnapshot can be passed into the existing generation workflow.

The first objective is to determine whether automatically structured context produces better drafts than manually entered context.

---

## Validate Add to Learning Workflow

Define and test the minimum user experience for selecting content to contribute to personalization.

Key questions include:

- What should users be allowed to add?
- What information should be stored?
- How should users understand what PersonaOS has learned?
- How should learned information be removed?

The goal is to validate the interaction before introducing a more sophisticated memory architecture.

---

## Improve Prompt Quality

Continue refining prompt construction based on:

- User intent
- Communication style
- Conversation context
- Structured screen context

Prompt improvements should be driven by observed output quality rather than increasing prompt complexity for its own sake.

---

## Basic Persona Persistence

Introduce the minimum persistence required to associate user-approved information with a Persona.

The implementation approach has not yet been finalized.

---

# 🔬 Future Research

The following areas are worth investigating but are **not committed roadmap features**.

---

## Retrieval-Augmented Generation (RAG)

Explore whether retrieval over user-approved historical writing can improve personalization.

Questions to validate before implementation include:

- Does retrieval materially improve draft quality?
- How much historical content is useful?
- What information should be retrieved?
- How should users inspect and remove stored information?

No production RAG implementation currently exists.

---

## Additional AI Providers

The existing provider abstraction makes additional providers technically possible.

Future evaluation may consider alternative hosted or local models based on:

- Quality
- Cost
- Latency
- Privacy
- Availability

No additional provider is currently implemented.

---

## Additional Context Sources

Explore whether the context-capture approach can generalize beyond the current Reddit experiment.

The immediate priority remains validating the approach rather than supporting many applications.

---

## Cross-Platform Assistance

Longer-term research may investigate ways PersonaOS could assist users across multiple communication environments.

Any such capability would need to preserve:

- Explicit user control
- Transparency
- Privacy
- Human review before publishing

---

# Product Prioritization Principles

PersonaOS follows a few simple prioritization principles.

## Validate Value Before Complexity

New infrastructure should only be introduced when there is evidence that it improves the product experience.

---

## Context Before Automation

The immediate goal is better contextual understanding, not autonomous communication.

---

## Learning Requires Consent

Personalization should remain user-controlled.

---

## Build Incrementally

Each capability should be validated independently before becoming part of the core architecture.

---

## Avoid Premature Scale

The current goal is to validate product behavior and technical feasibility.

Scale, distributed infrastructure and enterprise architecture are not current priorities.

---

# Current Product Sequence

The working sequence for PersonaOS is:

```text
1. Generate useful drafts
          │
          ▼
2. Improve contextual understanding
          │
          ▼
3. Validate Android context extraction
          │
          ▼
4. Validate user-controlled learning
          │
          ▼
5. Introduce basic Persona persistence
          │
          ▼
6. Evaluate retrieval-based personalization
          │
          ▼
7. Expand only where product value is proven
```

This sequence may change based on technical findings and user feedback.

---

# What Is Not a Current Priority

To keep the MVP focused, the following are not current development priorities:

- Microservices
- Distributed databases
- Enterprise-scale infrastructure
- Autonomous publishing
- Multi-agent systems
- Complex workflow orchestration
- Large-scale platform integrations

These capabilities should only be considered if future product needs justify them.

---

# Roadmap Philosophy

PersonaOS is being developed as a sequence of product experiments rather than a fixed feature checklist.

The objective is to answer increasingly difficult questions:

1. Can AI generate useful communication from structured intent and context?
2. Can contextual information be captured with less manual effort?
3. Can users safely control what the system learns?
4. Does personalization materially improve communication quality?
5. Can these capabilities work across different communication environments?

The roadmap will evolve based on the answers to those questions.
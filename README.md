# PersonaOS

> **Context-aware AI that helps you communicate in your own voice—not someone else's.**

[![Status](https://img.shields.io/badge/status-Early%20MVP-orange)]()
[![Backend](https://img.shields.io/badge/backend-FastAPI-009688)]()
[![Frontend](https://img.shields.io/badge/frontend-Next.js-black)]()
[![Language](https://img.shields.io/badge/language-TypeScript-blue)]()
[![Language](https://img.shields.io/badge/language-Python-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🚀 Overview

PersonaOS is an AI-powered communication companion that helps people write **posts, comments, replies, emails and messages** without losing their own voice.

Unlike traditional AI writing assistants that generate text from a prompt alone, PersonaOS combines:

- 🧠 User intent
- 💬 Conversation context
- 👤 Personal writing preferences
- 📚 User-controlled learning
- 🤖 AI-assisted generation

to produce drafts that feel authentic while ensuring the **user always remains in control**.

The objective isn't to replace human communication.

The objective is to **augment human communication.**

---

# 🚧 Current Status

**Early MVP — Active Development**

PersonaOS is currently being built in public.

This repository documents both the implementation and the product journey as the idea evolves from concept to a production-ready AI communication platform.

Current work focuses on validating the core product hypothesis while experimenting with contextual understanding, Android-based screen capture and user-controlled personalization.

---

# Why PersonaOS?

Large Language Models have made writing dramatically easier.

However, much AI-generated content still sounds...

> "AI-generated."

The reason is simple.

People don't communicate using words alone.

They communicate using:

- Intent
- Context
- Experience
- Personality
- Relationships
- Shared history

PersonaOS explores one question:

> **How can AI help people communicate without making everyone sound the same?**

Instead of replacing human communication, PersonaOS attempts to make it more natural, more personal and more efficient.

---

# Current MVP

The current MVP validates one core hypothesis:

> **AI-generated communication becomes significantly more authentic when it understands user intent, conversational context and personal writing preferences.**

Current capabilities include:

- ✅ Generate new posts
- ✅ Generate comments
- ✅ Generate replies
- ✅ Context-aware prompting
- ✅ Adjustable writing style
- ✅ Human review before publishing
- ✅ FastAPI backend
- ✅ Next.js + TypeScript frontend
- ✅ OpenAI integration
- ✅ Provider abstraction architecture

Currently under development:

- 🚧 Android contextual capture
- 🚧 Screen Snapshot generation
- 🚧 Reddit context extraction
- 🚧 User-controlled learning

The MVP intentionally keeps personalization lightweight while validating the overall product experience.

---

# User-Controlled Learning

One of PersonaOS's core ideas is that **learning should always happen with the user's permission.**

Most AI assistants either:

- Know nothing about you

or

- Try to learn everything.

PersonaOS takes a different approach.

Users explicitly decide what PersonaOS should learn.

Potential learning sources include:

- Reddit posts
- Reddit comments
- LinkedIn posts
- Emails
- Personal notes
- Documents
- Future platform integrations

Instead of automatically collecting information, PersonaOS allows users to selectively build their own communication knowledge base over time.

The objective is to better understand:

- Writing style
- Vocabulary
- Tone
- Frequently discussed topics
- Communication preferences

Nothing is added automatically.

Users remain in complete control of what becomes part of their Persona.

---

# Product Vision

PersonaOS is evolving into a cross-platform AI communication companion.

Rather than generating generic text, the long-term vision is to help people communicate more effectively while preserving authenticity and human control.

Potential future experiences include:

- Reddit
- LinkedIn
- Email
- Workplace collaboration
- Messaging platforms
- Documentation
- Community forums

The long-term goal is **not** autonomous communication.

The long-term goal is **AI-assisted communication that still feels human.**

---

# Design Philosophy

PersonaOS follows one simple principle.

> **AI should adapt to people. People shouldn't have to adapt to AI.**

Everything within PersonaOS is guided by five product principles.

---

## Human First

AI generates suggestions.

Humans make decisions.

PersonaOS never publishes content automatically.

---

## Context Matters

Good communication depends on understanding the situation.

PersonaOS attempts to understand:

- User intent
- Existing conversation
- Communication objective
- Available context

instead of generating isolated text.

---

## User-Controlled Learning

Learning is optional.

Users explicitly choose what PersonaOS learns instead of granting unrestricted access to their personal information.

---

## Privacy by Design

Users own their data.

Transparency, consent and user control are core product principles.

---

## Platform Agnostic

PersonaOS is designed as a communication companion rather than a platform-specific assistant.

The long-term vision is to support users wherever they communicate.

---

# How PersonaOS Works

```text
                            User
                              │
             ┌────────────────┴────────────────┐
             │                                 │
             ▼                                 ▼
      Conversation Context            Add to Learning
             │                                 │
             ▼                                 ▼
      Context Processing             Learning Pipeline
             └───────────────┬─────────────────┘
                             ▼
                 Persona Knowledge Base
                             │
                             ▼
                     Prompt Builder
                             │
                             ▼
                   AI Provider Layer
                     (OpenAI Today)
                             │
                             ▼
                    Draft Generation
                             │
                             ▼
                  User Review & Approval
                             │
                             ▼
                       Final Message
```

Future versions will continue improving contextual understanding while ensuring learning always remains transparent and user-controlled.

---

# Current Research

PersonaOS is currently exploring whether contextual understanding can be improved without requiring deep integrations with every platform.

An experimental Android application uses Accessibility Services to capture structured screen information (currently focused on Reddit) and transform it into a reusable **ScreenSnapshot**.

This research investigates whether contextual understanding can become a reusable capability across multiple applications while respecting user consent and privacy.
---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

The frontend provides an intuitive interface for configuring writing intent, communication style and contextual information before generating AI-assisted drafts.

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite

The backend exposes REST APIs responsible for prompt construction, AI provider orchestration and draft generation.

The architecture is intentionally modular to simplify future integrations.

---

## AI

Current implementation includes:

- OpenAI API
- Prompt Builder
- Provider Abstraction Layer

The provider abstraction isolates PersonaOS from individual AI vendors, allowing additional providers to be introduced with minimal application changes.

Future providers may include:

- Azure OpenAI
- Anthropic Claude
- Google Gemini
- Local LLMs

---

## Mobile (Experimental)

An Android Proof of Concept is currently under development.

Technologies include:

- Kotlin
- Android Accessibility Services
- Accessibility Tree Analysis
- Screen Snapshot Extraction

The Android component explores whether contextual understanding can be obtained directly from on-screen content while remaining transparent and user-controlled.

---

## Development Tools

- Git
- GitHub
- Docker (planned)
- VS Code
- Android Studio

---

# Repository Structure

```text
persona-os/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── config/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── prompt_builder.py
│   │   │   └── provider_factory.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── docs/
│
├── scripts/
│
└── README.md
```

---

# Product Decisions

PersonaOS is intentionally opinionated in several areas.

These decisions reflect the product philosophy rather than technical limitations.

---

## Human Approval Before Publishing

PersonaOS assists with communication.

It does **not** publish messages automatically.

Every draft is reviewed, edited and approved by the user.

---

## User-Controlled Learning

Learning only occurs when the user explicitly chooses to add content.

PersonaOS is designed to avoid hidden or automatic profile building.

---

## Context Before Generation

Traditional AI writing often begins with a prompt.

PersonaOS attempts to begin with context.

Understanding the conversation is considered more valuable than generating more words.

---

## Provider Independence

AI providers change rapidly.

PersonaOS separates business logic from provider implementations through an abstraction layer so that new providers can be introduced without significant architectural changes.

---

## Privacy First

Personalization should never come at the cost of transparency.

Future learning capabilities will continue to prioritize:

- Explicit consent
- User ownership
- Clear visibility
- Easy deletion
- Selective learning

---

# Product Roadmap

The roadmap represents current thinking and will evolve as new ideas are validated.

---

## ✅ Completed

- FastAPI backend
- Draft generation API
- Prompt Builder
- OpenAI integration
- Provider abstraction
- Context-aware prompting
- Adjustable writing styles
- Next.js frontend
- TypeScript migration

---

## 🚧 In Progress

- Android Accessibility Service
- Reddit context understanding
- Screen Snapshot generation
- User-controlled learning workflow
- Improved prompt engineering
- Better contextual awareness

---

## 📋 Planned

- Persona Knowledge Base
- Retrieval-Augmented Generation (RAG)
- Historical writing import
- Draft history
- Multi-provider AI support
- Persona management
- Communication analytics

---

## 🔬 Research

Areas currently being explored include:

- Browser extension
- Mobile keyboard integration
- Cross-device synchronization
- Enterprise collaboration
- Additional communication platforms
- Personal memory optimization

Research items are exploratory and should not be interpreted as committed roadmap features.

---

# Why Not Just Use ChatGPT?

ChatGPT is an exceptional general-purpose AI assistant.

PersonaOS explores a different problem.

Instead of asking:

> **"What should I write?"**

PersonaOS asks:

> **"How can AI help me write something that genuinely sounds like me?"**

The difference is subtle but important.

Traditional AI starts with a prompt.

PersonaOS aims to start with:

- Context
- Intent
- Communication history
- User preferences
- Optional learning

before generating a draft.

The objective is not simply producing text.

The objective is producing communication that feels authentic while keeping the user in complete control.

---

# Why I Built PersonaOS

As AI-generated content becomes increasingly common, one challenge became impossible to ignore.

> **How can AI help people communicate without making everyone sound the same?**

During my experience as a Product Manager, I realized that communication problems are rarely caused by poor writing.

They are usually caused by missing context.

PersonaOS is my exploration into whether AI can become a better communication companion by understanding context before generating content.

This project combines:

- Product thinking
- AI experimentation
- Software engineering
- Human-centered design

to explore how intelligent systems can augment communication while preserving authenticity, context and user control.

Beyond the implementation itself, this repository documents the architectural decisions, product trade-offs and technical experiments that shape the evolution of PersonaOS.

---

# Getting Started

## Prerequisites

Before running PersonaOS locally, ensure you have the following installed:

- Python 3.12+
- Node.js 20+
- npm
- Git

You will also need an OpenAI API key to enable AI-powered draft generation.

---

# Running the Backend

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux / macOS
source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

The backend will be available at:

```
http://localhost:8000
```

Swagger documentation:

```
http://localhost:8000/docs
```

---

# Running the Frontend

```bash
cd frontend

npm install

npm run dev
```

The frontend will be available at:

```
http://localhost:3000
```

---

# Related Repositories

### PersonaOS Android Context Capture

This repository focuses on experimental Android capabilities used to capture contextual information from on-screen content using Accessibility Services.

The long-term goal is to determine whether contextual understanding can improve AI-assisted communication without requiring deep integrations with every platform.

Repository:

```
https://github.com/rrsathaye/personaos-android-poc
```

---

# Planned Demonstrations

As the project evolves, this repository will include:

- Architecture diagrams
- Product walkthroughs
- UI screenshots
- Demo GIFs
- Android context capture examples
- ScreenSnapshot examples
- API examples

---

# Example Workflow

```text
User opens PersonaOS
        │
        ▼
Chooses communication intent
        │
        ▼
Provides context
        │
        ▼
(Optional)
Selects previously learned content
        │
        ▼
PersonaOS builds prompt
        │
        ▼
AI generates draft
        │
        ▼
User edits draft
        │
        ▼
User approves
        │
        ▼
Publish
```

---

# Future Vision

The long-term vision extends beyond generating better drafts.

PersonaOS explores whether AI can become a trusted communication companion that understands:

- How people write
- Why they write
- Who they are communicating with
- Which information is relevant
- What should remain private

while ensuring that every important decision remains under human control.

Future work may include:

- Cross-platform context awareness
- Persona knowledge graphs
- Retrieval-Augmented Generation (RAG)
- Browser extensions
- Mobile experiences
- Enterprise collaboration
- Multi-provider AI support

Every capability will continue to be evaluated against one guiding principle:

> AI should assist people—not replace them.

---

# Contributing

PersonaOS is an active learning project and contributions are always welcome.

Whether you're interested in:

- Product ideas
- Architecture discussions
- Prompt engineering
- AI integrations
- Android experimentation
- Documentation improvements

feel free to open an issue or submit a pull request.

Constructive feedback is always appreciated.

---

# Repository Status

Current development focuses on validating product assumptions through incremental MVP releases.

The roadmap will continue evolving as ideas are tested, feedback is gathered and technical experiments are completed.

Some capabilities described in this document represent future research directions rather than completed features.

---

# Acknowledgements

PersonaOS builds upon an incredible open-source ecosystem.

Special thanks to the communities behind:

- FastAPI
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- OpenAI
- Android Open Source Project

for providing the tools that make rapid experimentation possible.

---

# License

This project is licensed under the MIT License.

---

## If you find PersonaOS interesting...

⭐ Star the repository

🐛 Open an issue

💡 Share product ideas

🚀 Follow the project as it evolves

Every discussion and every piece of feedback helps shape the future direction of PersonaOS.
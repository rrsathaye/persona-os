# PersonaOS System Architecture

This document describes the current architecture of the PersonaOS ecosystem.

At present, PersonaOS consists of three independent but related components:

1. **Web Application** – User interface for AI-assisted writing
2. **Backend API** – AI orchestration and draft generation
3. **Android Context Capture POC** – Experimental context extraction using Android Accessibility Services

The Android application is currently a standalone research project and is **not yet integrated** with the backend.

---

# System Overview

```text
                    PersonaOS Ecosystem

             ┌──────────────────────────────┐
             │        Web Frontend          │
             │  Next.js • React • TS       │
             └──────────────┬──────────────┘
                            │
                      REST API Calls
                            │
                            ▼
             ┌──────────────────────────────┐
             │      FastAPI Backend         │
             └──────────────┬──────────────┘
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ▼                 ▼                  ▼
   Prompt Builder   Provider Factory     Response Models
                            │
                            ▼
                    OpenAI Provider
                            │
                            ▼
                     Generated Draft


------------------------------------------------------------


        Android Context Capture (Experimental)

 Android Screen
        │
        ▼
 Accessibility Service
        │
        ▼
 Accessibility Tree
        │
        ▼
 Application Analyzer
        │
        ▼
 ScreenSnapshot
```

The Android project is currently maintained separately while validating contextual understanding using Accessibility Services.

Future integration with the backend will only be introduced after the approach has been validated.

---

# Component Overview

## 1. Web Frontend

**Technology**

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Responsibilities

- Collect user intent
- Accept contextual information
- Configure communication style
- Display generated drafts
- Communicate with backend APIs

The frontend is intentionally lightweight.

Business logic remains inside the backend.

---

## 2. Backend

**Technology**

- Python
- FastAPI
- SQLAlchemy
- SQLite

### Responsibilities

- Receive API requests
- Validate request models
- Construct AI prompts
- Invoke AI providers
- Return structured responses

The backend acts as the orchestration layer for PersonaOS.

---

## 3. Android Context Capture (POC)

**Technology**

- Kotlin
- Android Accessibility Services

### Responsibilities

- Observe accessibility events
- Analyse visible UI hierarchy
- Extract contextual information
- Build structured ScreenSnapshot objects

Current experiments focus on Reddit to better understand conversational context.

This project is intentionally isolated while research is ongoing.

---

# Backend Architecture

The backend follows a layered architecture.

```text
Client Request
      │
      ▼
FastAPI Endpoint
      │
      ▼
Request Validation
      │
      ▼
Prompt Builder
      │
      ▼
Provider Factory
      │
      ▼
OpenAI Provider
      │
      ▼
Response Model
      │
      ▼
Client
```

Each layer has a single responsibility.

---

# Prompt Builder

The Prompt Builder converts structured application data into prompts suitable for Large Language Models.

Current inputs include:

- User intent
- Communication style
- User input
- Conversation context

Keeping prompt generation independent from AI providers makes prompt experimentation significantly easier.

---

# Provider Abstraction

PersonaOS does not communicate directly with AI providers throughout the application.

Instead, all requests pass through a Provider Factory.

Current implementation:

- OpenAI

This design allows additional providers to be introduced without changing application logic.

---

# Android Processing Pipeline

The Android application currently processes information using the following pipeline.

```text
Accessibility Event
        │
        ▼
PersonaAccessibilityService
        │
        ▼
Screen Analyzer
        │
        ▼
Application Detection
        │
        ▼
Reddit Analyzer
        │
        ▼
Node Filter
        │
        ▼
Node Index
        │
        ▼
Reddit Parser
        │
        ▼
ScreenSnapshot Builder
        │
        ▼
Structured ScreenSnapshot
```

Each stage performs a single responsibility, making the pipeline easier to extend and debug.

---

# Current Request Flow

The current MVP follows a straightforward request lifecycle.

```text
User
 │
 ▼
Web Frontend
 │
 ▼
POST /ai/generate
 │
 ▼
FastAPI Backend
 │
 ▼
Prompt Builder
 │
 ▼
Provider Factory
 │
 ▼
OpenAI
 │
 ▼
Generated Draft
 │
 ▼
Frontend
 │
 ▼
User Review
```

PersonaOS does not automatically publish generated content.

Every response is reviewed and approved by the user.

---

# Design Principles

## Separation of Concerns

Each component has a clearly defined responsibility.

Examples include:

- Frontend presentation
- API orchestration
- Prompt generation
- AI provider integration
- Android context extraction

This reduces coupling and simplifies future enhancements.

---

## Provider Independence

AI provider implementations remain isolated behind an abstraction layer.

Application logic should not depend on provider-specific APIs.

---

## Human-in-the-Loop

PersonaOS assists users with drafting content.

Publishing decisions always remain with the user.

---

## Context First

PersonaOS attempts to improve communication by understanding context before generating text.

Current context sources include:

- User input
- Conversation context
- Communication style

Additional context sources remain an active area of research.

---

# Current Limitations

PersonaOS is intentionally focused on validating the core product experience.

Current limitations include:

- Single AI provider
- No authentication
- No persistent persona storage
- No Retrieval-Augmented Generation (RAG)
- Android project not yet integrated with backend
- Limited supported applications for context capture

These limitations are expected for the current stage of the project.

---

# Areas Under Investigation

The following areas are currently being explored and should not be interpreted as implemented features.

- User-controlled learning
- Persona knowledge base
- Retrieval-Augmented Generation (RAG)
- Additional AI providers
- Improved contextual understanding
- Integration of Android-generated ScreenSnapshot into backend prompt generation

---

# Architecture Goals

As PersonaOS evolves, the architecture should remain:

- Modular
- Simple
- Extensible
- Testable
- Human-centered

New capabilities should be introduced by extending existing components rather than tightly coupling functionality into the core system.
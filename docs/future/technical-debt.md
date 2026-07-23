# Technical Debt

## Navigation State

Current implementation uses multiple boolean states.

Current

- showWritingType
- showContext

Future

Replace with a single screen state or finite state machine.

Example:

type Screen =
  | "home"
  | "writing-type"
  | "context"
  | "communication-mix"
  | "review";

Priority: Medium

Reason:
Simplifies navigation as PersonaOS grows.
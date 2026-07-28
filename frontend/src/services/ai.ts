import type { CommunicationStyle } from "@/types/communication";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export interface GenerateDraftRequest {
  persona_id: string;
  intent: string;
  communication_style: CommunicationStyle;
  screen_snapshot: unknown;
}

export async function generateDraft(
  request: GenerateDraftRequest
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Failed to generate draft");
  }

  const data = await response.json();

  return data.draft;
}

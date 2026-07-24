import type { CommunicationStyle } from "@/types/communication";

const API_BASE_URL = "http://127.0.0.1:8000";

export type GenerateDraftRequest = {
  writing_type: string;
  context: string;
  communication_style: CommunicationStyle;
};

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
    throw new Error("Failed to generate draft");
  }

  const data = await response.json();

  return data.draft;
}
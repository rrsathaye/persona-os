import type { WritingSession } from "@/types/writingSession";

export function createDefaultWritingSession(): WritingSession {
  return {
    writingType: null,
    context: "",
    draft: "",
    communicationStyle: {
      dimensions: [
        {
          id: "professionalism",
          leftLabel: "Professional",
          rightLabel: "Casual",
          balance: 20,
        },
        {
          id: "tone",
          leftLabel: "Formal",
          rightLabel: "Friendly",
          balance: 70,
        },
        {
          id: "length",
          leftLabel: "Concise",
          rightLabel: "Detailed",
          balance: 40,
        },
        {
          id: "style",
          leftLabel: "Reserved",
          rightLabel: "Expressive",
          balance: 75,
        },
      ],
    },
  };
}
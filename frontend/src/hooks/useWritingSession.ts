import { useState } from "react";
import { createDefaultWritingSession } from "@/constants/defaultWritingSession";
import type { WritingType } from "@/types/writing";
import type { CommunicationStyle } from "@/types/communication";

export function useWritingSession() {
  const [session, setSession] = useState(createDefaultWritingSession);

  const setWritingType = (writingType: WritingType) =>
    setSession((prev) => ({
      ...prev,
      writingType,
    }));

  const setContext = (context: string) =>
    setSession((prev) => ({
      ...prev,
      context,
    }));

  const setCommunicationStyle = (communicationStyle: CommunicationStyle) =>
    setSession((prev) => ({
      ...prev,
      communicationStyle,
    }));

  const setDraft = (draft: string) =>
    setSession((prev) => ({
      ...prev,
      draft,
    }));

  const resetSession = () => {
    setSession(createDefaultWritingSession());
  };

  return {
    session,
    setWritingType,
    setContext,
    setCommunicationStyle,
    setDraft,
    resetSession,
  };
}
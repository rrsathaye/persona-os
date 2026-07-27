import type { WritingType } from "./writing";
import type { CommunicationStyle } from "./communication";

export type WritingSession = {
  writingType: WritingType | null;
  context: string;
  communicationStyle: CommunicationStyle;
  draft: string;
};
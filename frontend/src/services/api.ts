import type { CommunicationStyle } from "@/types/communication";
import type { WritingType } from "@/types/writing";

export interface GenerateDraftRequest {
    persona_id: string;
    writing_type: WritingType;
    intent: string;
    context: string;
    communication_style: CommunicationStyle;
    screen_snapshot: unknown | null;
}

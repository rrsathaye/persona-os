import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

import type { WritingType } from "@/types/writing";

type ContextScreenProps = {
  onBack: () => void;
  onContinue: () => void;
  writingType: WritingType;
};
const content = {
  comment: {
    title: "What are we responding to?",
    subtitle:
      "Paste the post, email, message or content you'd like PersonaOS to understand.",
    placeholder:
      "Paste a Reddit post, LinkedIn post, email or message...",
  },
  reply: {
    title: "What are we replying to?",
    subtitle:
      "Paste the conversation or message you'd like to reply to.",
    placeholder:
      "Paste the conversation here...",
  },
  post: {
    title: "What would you like to write about?",
    subtitle:
      "Describe what you'd like to write. A sentence is enough.",
    placeholder:
      "Example: Announce a product launch or share today's learning...",
  },
} as const;



export default function ContextScreen({
  onBack,
  onContinue,
  writingType,
}: ContextScreenProps) {
    const screen = content[writingType];
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back
        </button>

      <PageHeader
  title={screen.title}
  subtitle={screen.subtitle}
/>

        <textarea
          placeholder={screen.placeholder}
          className="mt-10 h-72 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white outline-none transition focus:border-zinc-600"
        />

        <div className="mt-8 flex justify-end">
         <button
  onClick={onContinue}
  className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
>   Continue →
            
          </button>
        </div>
      </div>
    </AppShell>
  );
}
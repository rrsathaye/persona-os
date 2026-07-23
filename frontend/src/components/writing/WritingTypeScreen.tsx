import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";
import type { WritingType } from "@/types/writing";
import {
  MessageCircle,
  Reply,
  PenSquare,
} from "lucide-react";

type WritingTypeScreenProps = {
  onBack: () => void;
  onSelect: (type: WritingType) => void;
};

const writingTypes = [
  {
    type: "comment" as const,
    title: "Comment",
    description: "Respond to an existing post or discussion.",
    icon: MessageCircle,
  },
  {
    type: "reply" as const,
    title: "Reply",
    description: "Continue an ongoing conversation.",
    icon: Reply,
  },
  {
    type: "post" as const,
    title: "Post",
    description: "Create a brand-new post or message.",
    icon: PenSquare,
  },
];

export default function WritingTypeScreen({
  onBack,
  onSelect,
}: WritingTypeScreenProps) {
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
          title="What are we writing today?"
          subtitle="Choose how you'd like to start."
        />

        <div className="mt-10 grid gap-4">
          {writingTypes.map((item) => {
            const Icon = item.icon;

            return (
             <button
  key={item.title}
  onClick={() => onSelect(item.type)}
                className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800"
              >
                <div className="flex items-start gap-4">
                  <Icon className="mt-1 h-6 w-6 transition-transform group-hover:scale-110" />

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
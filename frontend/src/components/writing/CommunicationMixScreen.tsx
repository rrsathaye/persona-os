import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

type CommunicationMixScreenProps = {
  onBack: () => void;
  onGenerate: () => void;
};

const options = [
  {
    label: "Professional",
    left: "Professional",
    right: "Casual",
  },
  {
    label: "Tone",
    left: "Formal",
    right: "Friendly",
  },
  {
    label: "Length",
    left: "Concise",
    right: "Detailed",
  },
  {
    label: "Style",
    left: "Reserved",
    right: "Expressive",
  },
];

export default function CommunicationMixScreen({
  onBack,
  onGenerate,
}: CommunicationMixScreenProps) {
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
          title="Communication Mix"
          subtitle="Tell PersonaOS how you'd like this response to sound."
        />

        <div className="mt-10 space-y-6">
          {options.map((option) => (
            <div
              key={option.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="mb-4 text-sm font-medium text-zinc-400">
                {option.label}
              </p>

              <div className="flex items-center justify-between">
                <button className="rounded-lg border border-zinc-700 px-4 py-2 transition hover:border-white">
                  {option.left}
                </button>

                <span className="text-zinc-600">⟷</span>

                <button className="rounded-lg border border-zinc-700 px-4 py-2 transition hover:border-white">
                  {option.right}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
         <button
  onClick={onGenerate}
  className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
>
            Generate Draft →
          </button>
        </div>
      </div>
    </AppShell>
  );
}
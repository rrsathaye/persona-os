import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

type DraftScreenProps = {
  onBack: () => void;
};

export default function DraftScreen({
  onBack,
}: DraftScreenProps) {
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
          title="Draft Ready"
          subtitle="PersonaOS has prepared a first draft for you."
        />

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="whitespace-pre-line leading-8 text-zinc-200">
{`Hi John,

Thank you for sharing the details.

I appreciate the context you've provided. Based on what you've shared, I think we should schedule a quick discussion to align on the next steps before moving forward.

Please let me know a suitable time and I'll be happy to connect.

Looking forward to hearing from you.

Best,
Rahul`}
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button className="rounded-xl border border-zinc-700 px-6 py-3 hover:border-white">
            Regenerate
          </button>

          <button className="rounded-xl bg-white px-6 py-3 font-medium text-black hover:opacity-90">
            Copy
          </button>
        </div>
      </div>
    </AppShell>
  );
}
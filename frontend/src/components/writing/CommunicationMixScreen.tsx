import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

type CommunicationMix = {
  professional: number;
  friendly: number;
  concise: number;
  expressive: number;
};

type CommunicationMixScreenProps = {
  onBack: () => void;
  onGenerate: (mix: CommunicationMix) => void;
  isGenerating: boolean;
};

export default function CommunicationMixScreen({
  onBack,
  onGenerate,
   isGenerating,
}: CommunicationMixScreenProps) {
  const [mix, setMix] = useState<CommunicationMix>({
    professional: 50,
    friendly: 50,
    concise: 50,
    expressive: 50,
  });

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

          {/* Professional */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-4 text-sm font-medium text-zinc-400">
              Professional
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMix({ ...mix, professional: 100 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Professional
              </button>

              <span className="text-zinc-600">⟷</span>

              <button
                onClick={() =>
                  setMix({ ...mix, professional: 0 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Casual
              </button>
            </div>
          </div>

          {/* Tone */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-4 text-sm font-medium text-zinc-400">
              Tone
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMix({ ...mix, friendly: 0 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Formal
              </button>

              <span className="text-zinc-600">⟷</span>

              <button
                onClick={() =>
                  setMix({ ...mix, friendly: 100 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Friendly
              </button>
            </div>
          </div>

          {/* Length */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-4 text-sm font-medium text-zinc-400">
              Length
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMix({ ...mix, concise: 100 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Concise
              </button>

              <span className="text-zinc-600">⟷</span>

              <button
                onClick={() =>
                  setMix({ ...mix, concise: 0 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Detailed
              </button>
            </div>
          </div>

          {/* Style */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-4 text-sm font-medium text-zinc-400">
              Style
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMix({ ...mix, expressive: 0 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Reserved
              </button>

              <span className="text-zinc-600">⟷</span>

              <button
                onClick={() =>
                  setMix({ ...mix, expressive: 100 })
                }
                className="rounded-lg border border-zinc-700 px-4 py-2 hover:border-white"
              >
                Expressive
              </button>
            </div>
          </div>

        </div>

        <div className="mt-10 flex justify-end">
          <button
  disabled={isGenerating}
  onClick={() => onGenerate(mix)}
  className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
>
  {isGenerating ? "Generating..." : "Generate Draft →"}
</button>
        </div>
      </div>
    </AppShell>
  );
}
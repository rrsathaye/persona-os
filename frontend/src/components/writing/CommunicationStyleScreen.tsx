"use client";

import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";
import CommunicationSlider from "@/components/common/CommunicationSlider";

import type { CommunicationStyle } from "@/types/communication";

type CommunicationStyleScreenProps = {
  communicationStyle: CommunicationStyle;
  isGenerating: boolean;
  onBack: () => void;
  onGenerate: (style: CommunicationStyle) => void;
};

export default function CommunicationStyleScreen({
  communicationStyle,
  isGenerating,
  onBack,
  onGenerate,
}: CommunicationStyleScreenProps) {
  const [style, setStyle] = useState(communicationStyle);

  const updateBalance = (id: string, balance: number) => {
    setStyle((prev) => ({
      ...prev,
      dimensions: prev.dimensions.map((dimension) =>
        dimension.id === id
          ? { ...dimension, balance }
          : dimension
      ),
    }));
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <PageHeader
          title="Adjust Communication Style"
          subtitle="Give PersonaOS a starting point."
        />

        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-sm text-zinc-400">
            As you review and edit drafts, PersonaOS will learn your
            communication style and continuously improve future drafts.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {style.dimensions.map((dimension) => (
            <CommunicationSlider
              key={dimension.id}
              leftLabel={dimension.leftLabel}
              rightLabel={dimension.rightLabel}
              value={dimension.balance}
              onChange={(balance) =>
                updateBalance(dimension.id, balance)
              }
            />
          ))}
        </div>

        <div className="mt-12 flex justify-end gap-3">
          <button
            onClick={onBack}
            className="rounded-lg border border-zinc-700 px-5 py-2 hover:bg-zinc-900"
          >
            Back
          </button>

          <button
            disabled={isGenerating}
            onClick={() => onGenerate(style)}
            className="rounded-lg bg-white px-5 py-2 text-black disabled:opacity-50"
          >
            {isGenerating ? "Generating Draft..." : "Continue"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
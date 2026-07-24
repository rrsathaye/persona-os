"use client";

import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";
import CommunicationSlider from "@/components/common/CommunicationSlider";

import type { CommunicationStyle } from "@/types/communication";

type CommunicationMixScreenProps = {
  communicationStyle: CommunicationStyle;
  isGenerating: boolean;
  onBack: () => void;
  onGenerate: (style: CommunicationStyle) => void;
};

export default function CommunicationMixScreen({
  communicationStyle,
  isGenerating,
  onBack,
  onGenerate,
}: CommunicationMixScreenProps) {
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
          title="Communication Style"
          subtitle="Adjust how PersonaOS should communicate."
        />

        <div className="mt-10 space-y-8">
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

        <div className="mt-12 flex justify-between">
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
            {isGenerating ? "Generating..." : "Generate Draft"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
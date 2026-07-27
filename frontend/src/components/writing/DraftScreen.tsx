"use client";

import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

type DraftScreenProps = {
  draft: string;
  onBack: () => void;
  onRefine: () => void;
};

export default function DraftScreen({
  draft,
  onBack,
  onRefine,
}: DraftScreenProps) {
  const [copied, setCopied] = useState(false);
  const [editedDraft, setEditedDraft] = useState(draft);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editedDraft);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
          subtitle="Review, edit, and refine your draft before copying it."
        />

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <textarea
            value={editedDraft}
            onChange={(e) => setEditedDraft(e.target.value)}
            className="min-h-[300px] w-full resize-y rounded-lg bg-transparent text-zinc-200 leading-8 outline-none"
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onRefine}
            className="rounded-xl border border-zinc-700 px-6 py-3 hover:border-white"
          >
            Refine Draft
          </button>

          <button
            onClick={handleCopy}
            className="rounded-xl bg-white px-6 py-3 font-medium text-black hover:opacity-90"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
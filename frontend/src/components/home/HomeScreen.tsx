"use client";

import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import FadeIn from "@/components/common/FadeIn";
import PageHeader from "@/components/common/PageHeader";

import SessionCard from "@/components/home/SessionCard";
import NewWritingCard from "@/components/home/NewWritingCard";

import WritingTypeScreen from "@/components/writing/WritingTypeScreen";
import ContextScreen from "@/components/writing/ContextScreen";
import CommunicationMixScreen from "@/components/writing/CommunicationStyleScreen";
import DraftScreen from "@/components/writing/DraftScreen";

import { generateDraft } from "@/services/ai";

import type { WritingType } from "@/types/writing";
import type { CommunicationStyle } from "@/types/communication";

export default function HomeScreen() {
  const [showWritingType, setShowWritingType] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [showCommunicationMix, setShowCommunicationMix] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  const [writingType, setWritingType] = useState<WritingType | null>(null);
  const [context, setContext] = useState("");
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [communicationStyle, setCommunicationStyle] =
    useState<CommunicationStyle>({
      dimensions: [
        {
          id: "professionalism",
          leftLabel: "Professional",
          rightLabel: "Casual",
          balance: 20,
        },
        {
          id: "tone",
          leftLabel: "Formal",
          rightLabel: "Friendly",
          balance: 70,
        },
        {
          id: "length",
          leftLabel: "Concise",
          rightLabel: "Detailed",
          balance: 40,
        },
        {
          id: "style",
          leftLabel: "Reserved",
          rightLabel: "Expressive",
          balance: 75,
        },
      ],
    });

  if (showDraft) {
    return (
      <DraftScreen
        draft={draft}
        onBack={() => {
          setShowDraft(false);
          setShowCommunicationMix(true);
        }}
      />
    );
  }

  if (showCommunicationMix) {
    return (
      <CommunicationMixScreen
        communicationStyle={communicationStyle}
        isGenerating={isGenerating}
        onBack={() => {
          setShowCommunicationMix(false);
          setShowContext(true);
        }}
        onGenerate={async (style) => {
          try {
            setIsGenerating(true);

            setCommunicationStyle(style);

            const generatedDraft = await generateDraft({
              writing_type: writingType!,
              context,
              communication_style: style,
            });

            setDraft(generatedDraft);

            setShowCommunicationMix(false);
            setShowDraft(true);
          } catch (error) {
            console.error(error);
            alert("Failed to generate draft.");
          } finally {
            setIsGenerating(false);
          }
        }}
      />
    );
  }

  if (showContext) {
    return (
      <ContextScreen
        writingType={writingType!}
        onBack={() => {
          setShowContext(false);
          setShowWritingType(true);
        }}
        onContinue={(context) => {
          setContext(context);
          setShowContext(false);
          setShowCommunicationMix(true);
        }}
      />
    );
  }

  if (showWritingType) {
    return (
      <WritingTypeScreen
        onBack={() => setShowWritingType(false)}
        onSelect={(type) => {
          setWritingType(type);
          setShowWritingType(false);
          setShowContext(true);
        }}
      />
    );
  }

  return (
    <AppShell>
      <FadeIn>
        <div className="mx-auto w-full max-w-3xl">
          <PageHeader
            title="PersonaOS"
            subtitle="AI that helps you communicate—without losing your voice."
          />

          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold">
              Continue where you left off
            </h2>

            <div className="space-y-4">
              <SessionCard
                title="LinkedIn Comment"
                lastEdited="2 minutes ago"
              />

              <SessionCard
                title="Vendor Email"
                lastEdited="Yesterday"
              />

              <SessionCard
                title="Reddit Post"
                lastEdited="2 days ago"
              />

              <NewWritingCard
                onClick={() => setShowWritingType(true)}
              />
            </div>
          </section>
        </div>
      </FadeIn>
    </AppShell>
  );
}
"use client";
import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";
import SessionCard from "@/components/home/SessionCard";
import NewWritingCard from "@/components/home/NewWritingCard";
import FadeIn from "../common/FadeIn";
import { useState } from "react";
import WritingTypeScreen from "@/components/writing/WritingTypeScreen";
import ContextScreen from "@/components/writing/ContextScreen";
import type { WritingType } from "@/types/writing";
import CommunicationMixScreen from "@/components/writing/CommunicationMixScreen";
import DraftScreen from "@/components/writing/DraftScreen";
import { generateDraft } from "@/services/ai";


export default function HomeScreen() {
  const [showWritingType, setShowWritingType] = useState(false);
const [showContext, setShowContext] = useState(false);
const [showCommunicationMix, setShowCommunicationMix] = useState(false);
const [showDraft, setShowDraft] = useState(false);
const [writingType, setWritingType] = useState<WritingType | null>(null);

const [context, setContext] = useState("");
const [isGenerating, setIsGenerating] = useState(false);
const [communicationMix, setCommunicationMix] = useState({
  professional: 50,
  friendly: 50,
  concise: 50,
  expressive: 50,
});

const [draft, setDraft] = useState("");

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
 isGenerating={isGenerating}
  onBack={() => {
    setShowCommunicationMix(false);
    setShowContext(true);
  }}
onGenerate={async (mix) => {
  try {
    setIsGenerating(true);

    setCommunicationMix(mix);

    const generatedDraft = await generateDraft({
      writing_type: writingType!,
      context,
      communication_mix: mix,
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
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


export default function HomeScreen() {
  const [showWritingType, setShowWritingType] = useState(false);
const [showContext, setShowContext] = useState(false);
const [showCommunicationMix, setShowCommunicationMix] = useState(false);
const [showDraft, setShowDraft] = useState(false);
const [writingType, setWritingType] = useState<WritingType | null>(null);

if (showDraft) {
  return (
    <DraftScreen
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
  onBack={() => {
    setShowCommunicationMix(false);
    setShowContext(true);
  }}
  onGenerate={() => {
    setShowCommunicationMix(false);
    setShowDraft(true);
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
  onContinue={() => {
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
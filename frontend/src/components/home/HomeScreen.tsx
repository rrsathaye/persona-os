"use client";
import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";
import SessionCard from "@/components/home/SessionCard";
import NewWritingCard from "@/components/home/NewWritingCard";
import FadeIn from "../common/FadeIn";
import { useState } from "react";
import WritingTypeScreen from "@/components/writing/WritingTypeScreen";

export default function HomeScreen() {
  const [showWritingType, setShowWritingType] = useState(false);
   
    if (showWritingType) {
  return <WritingTypeScreen />;
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
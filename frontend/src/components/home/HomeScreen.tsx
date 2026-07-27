"use client";

import { useState } from "react";

import AppShell from "@/components/common/AppShell";
import FadeIn from "@/components/common/FadeIn";
import PageHeader from "@/components/common/PageHeader";

import SessionCard from "@/components/home/SessionCard";
import NewWritingCard from "@/components/home/NewWritingCard";

import WritingTypeScreen from "@/components/writing/WritingTypeScreen";
import ContextScreen from "@/components/writing/ContextScreen";
import CommunicationStyleScreen from "@/components/writing/CommunicationStyleScreen";
import DraftScreen from "@/components/writing/DraftScreen";

import { generateDraft } from "@/services/ai";

import type { WritingType } from "@/types/writing";
import type { CommunicationStyle } from "@/types/communication";

type Screen =
  | "home"
  | "writingType"
  | "context"
  | "communicationStyle"
  | "draft";

export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");

  const [writingType, setWritingType] =
    useState<WritingType | null>(null);

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

  switch (currentScreen) {
    case "writingType":
      return (
        <WritingTypeScreen
          onBack={() => setCurrentScreen("home")}
          onSelect={(type) => {
            setWritingType(type);
            setCurrentScreen("context");
          }}
        />
      );

    case "context":
      return (
        <ContextScreen
  writingType={writingType!}
  context={context}
          onBack={() => setCurrentScreen("writingType")}
          onContinue={(newContext) => {
            setContext(newContext);
            setCurrentScreen("communicationStyle");
          }}
        />
      );

    case "communicationStyle":
      return (
        <CommunicationStyleScreen
          communicationStyle={communicationStyle}
          isGenerating={isGenerating}
          onBack={() => setCurrentScreen("context")}
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
              setCurrentScreen("draft");
            } catch (error) {
              console.error(error);
              alert("Failed to generate draft.");
            } finally {
              setIsGenerating(false);
            }
          }}
        />
      );

    case "draft":
      return (
        <DraftScreen
          draft={draft}
          onBack={() => setCurrentScreen("communicationStyle")}
          onRefine={() => setCurrentScreen("context")}
        />
      );

    case "home":
    default:
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
                    onClick={() =>
                      setCurrentScreen("writingType")
                    }
                  />
                </div>
              </section>
            </div>
          </FadeIn>
        </AppShell>
      );
  }
}
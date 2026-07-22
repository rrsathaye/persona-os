import AppShell from "@/components/common/AppShell";
import PageHeader from "@/components/common/PageHeader";

export default function WritingTypeScreen() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl">
        <PageHeader
          title="What are we writing today?"
          subtitle="Choose how you'd like to start."
        />

        <div className="mt-12 grid grid-cols-3 gap-4">
          <button className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6 transition-all hover:border-white hover:bg-neutral-800">
            Comment
          </button>

          <button className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6 transition-all hover:border-white hover:bg-neutral-800">
            Reply
          </button>

          <button className="rounded-2xl border border-neutral-700 bg-neutral-900 p-6 transition-all hover:border-white hover:bg-neutral-800">
            Post
          </button>
        </div>
      </div>
    </AppShell>
  );
}
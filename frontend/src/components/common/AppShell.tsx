type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex h-screen w-full max-w-5xl flex-col px-6">
        {children}
      </div>
    </main>
  );
}
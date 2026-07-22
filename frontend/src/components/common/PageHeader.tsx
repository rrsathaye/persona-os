type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-400">
          {subtitle}
        </p>
      )}
    </header>
  );
}
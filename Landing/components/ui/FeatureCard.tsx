type Props = {
  title: string;
  body: string;
  icon?: React.ReactNode;
};

export default function FeatureCard({ title, body, icon }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6">
      {icon && (
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-soft)] text-[var(--accent)]">
          {icon}
        </div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-[var(--primary)]">
        {title}
      </h3>
      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
        {body}
      </p>
    </div>
  );
}

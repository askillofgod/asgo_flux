type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: Props) {
  const isDark = tone === "dark";
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = isDark ? "text-white" : "text-[var(--primary)]";
  const descColor = isDark ? "text-white/70" : "text-[var(--text-muted)]";
  const eyebrowColor = isDark ? "text-[var(--accent-cyan)]" : "text-[var(--accent)]";

  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] ${eyebrowColor} uppercase`}
        >
          <span
            className={`h-px w-6 ${isDark ? "bg-[var(--accent-cyan)]/70" : "bg-[var(--accent)]"}`}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-[28px] sm:text-[34px] md:text-[44px] font-extrabold leading-[1.18] tracking-tight whitespace-pre-line ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[15px] sm:text-base leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}

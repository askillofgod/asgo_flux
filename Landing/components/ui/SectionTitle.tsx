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
  const descColor = isDark ? "text-white/75" : "text-[var(--text-soft)]";
  const eyebrowColor = isDark ? "text-[var(--accent-cyan)]" : "text-[var(--accent)]";

  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p
          className={`mb-4 inline-flex items-center gap-2 text-eyebrow ${eyebrowColor}`}
        >
          <span
            className={`h-px w-6 ${isDark ? "bg-[var(--accent-cyan)]/70" : "bg-[var(--accent)]/70"}`}
          />
          {eyebrow}
        </p>
      )}
      <h2 className={`text-h2 whitespace-pre-line ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-body-lg ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}

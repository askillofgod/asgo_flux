type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wider text-[var(--accent)] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold leading-[1.2] text-[var(--primary)] whitespace-pre-line">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] sm:text-base text-[var(--text-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

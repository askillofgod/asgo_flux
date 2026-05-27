import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-dark" | "kakao" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const sizeMap: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-[17px]",
};

const variantMap: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_55%,#1d4ed8_100%)] shadow-[0_10px_30px_-12px_rgba(37,99,235,0.55)] hover:shadow-[0_14px_36px_-12px_rgba(37,99,235,0.7)] hover:brightness-[1.05] active:brightness-95",
  secondary:
    "bg-white text-[var(--primary)] border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  "secondary-dark":
    "bg-white/[0.04] text-white border border-white/15 backdrop-blur hover:bg-white/[0.08] hover:border-white/35",
  kakao:
    "bg-[var(--kakao)] text-[var(--kakao-text)] hover:brightness-95 shadow-[0_8px_24px_-12px_rgba(254,229,0,0.6)]",
  ghost:
    "bg-transparent text-[var(--primary)] hover:bg-[var(--bg-soft)]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ariaLabel,
}: Props) {
  const classes = `${base} ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

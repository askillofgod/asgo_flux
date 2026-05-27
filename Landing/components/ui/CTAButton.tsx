import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "kakao" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2";

const sizeMap: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-[17px]",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] active:bg-[var(--accent-strong)]",
  secondary:
    "bg-white text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--bg-soft)]",
  kakao:
    "bg-[var(--kakao)] text-[var(--kakao-text)] hover:brightness-95",
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

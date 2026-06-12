import Link from "next/link";
import type { ReactNode } from "react";
import type { Route } from "next";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
type ButtonSize = "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

function buttonClass(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return ["btn", `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(" ");
}

/**
 * Internal link button. `href` is a typed route — callers pass values resolved
 * from the content/route layer, never hand-built strings. External destinations
 * use ExternalButton instead.
 */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className
}: ButtonBaseProps & { href: Route }) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      <span className="btn-label">{children}</span>
    </Link>
  );
}

/** Button for external/non-route destinations (repos, docs, subdomains, mail). */
export function ExternalButton({
  href,
  children,
  variant = "secondary",
  size = "md",
  className
}: ButtonBaseProps & { href: string }) {
  const external = /^https?:|^mailto:/.test(href);
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span className="btn-label">{children}</span>
    </a>
  );
}

/** Small-caps mono label used for eyebrows and section kickers. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={["eyebrow", className].filter(Boolean).join(" ")}>{children}</p>;
}

type BadgeTone = "default" | "accent" | "outline";

/** Pill label for capability tags, OSS markers, version chips. */
export function Badge({
  children,
  tone = "default",
  className
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={["badge", `badge-${tone}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}

/** GhostBadge — a hairline-bordered eyebrow chip, the template's section opener. */
export function GhostBadge({ children }: { children: ReactNode }) {
  return (
    <span className="ghost-badge">
      <span className="ghost-badge-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

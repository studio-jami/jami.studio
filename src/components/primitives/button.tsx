import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "md" | "lg";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  "aria-label"?: string;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function classes(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return ["btn", `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(" ");
}

/**
 * Action link rendered as a Nouva pill. `primary` is the template's LIGHT pill with a
 * near-black label; `secondary`/`ghost` are hairline surface pills on the void; `accent`
 * is the reserved neon-lime moment. One shape, one radius scale, one motion vocabulary.
 * Renders an internal `next/link` for app routes and a plain anchor for external/protocol
 * hrefs. Hrefs always come from the content/route layer — never hand-built in components.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  const cls = classes(variant, size, className);

  if (isInternal(href)) {
    return (
      <Link href={href as Route} className={cls} {...rest}>
        <span className="btn-label">{children}</span>
      </Link>
    );
  }

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      <span className="btn-label">{children}</span>
    </a>
  );
}

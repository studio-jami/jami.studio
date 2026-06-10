import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * The single button shape for the whole site: pill, mono uppercase label,
 * one radius, one motion. Internal routes render through next/link; external
 * targets open in a new tab with a directional glyph.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel
}: ButtonLinkProps) {
  const external = isExternal(href);
  const classes = ["btn", `btn--${variant}`];
  if (className) classes.push(className);

  const label = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-glyph" aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        className={classes.join(" ")}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
      >
        {label}
      </a>
    );
  }

  return (
    <Link className={classes.join(" ")} href={href as Route} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "solid" | "accent" | "ghost" | "link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
};

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * One button shape, one radius scale, one motion vocabulary across the whole lane.
 * Internal hrefs (from the route/content layer) render `next/link`; everything else
 * renders an `<a>`. Hrefs are always supplied by the caller from content/route helpers —
 * never hand-assembled here.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel
}: ButtonProps) {
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");
  const external = !isInternal(href);

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        target="_blank"
        rel="noreferrer"
      >
        <span className="btn-label">{children}</span>
        {variant !== "link" ? <ArrowGlyph /> : null}
      </a>
    );
  }

  return (
    <Link className={classes} href={href as Route} aria-label={ariaLabel}>
      <span className="btn-label">{children}</span>
      {variant !== "link" ? <ArrowGlyph /> : null}
    </Link>
  );
}

function ArrowGlyph() {
  return (
    <svg
      className="btn-arrow"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

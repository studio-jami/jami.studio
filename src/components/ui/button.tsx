import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  block?: boolean;
  className?: string;
  /** "arrow" = horizontal arrow (internal), "external" = up-right arrow, "none". */
  icon?: "arrow" | "external" | "none";
  "aria-label"?: string;
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

/**
 * Single button shape for the whole site. Internal hrefs route through next/link (typedRoutes);
 * external + mailto hrefs render as anchors with safe rel. Hrefs always come from the content/route
 * layer — never hand-built here.
 */
export function Button({
  href,
  children,
  variant = "primary",
  block = false,
  className,
  icon = "none",
  "aria-label": ariaLabel
}: ButtonProps) {
  const classes = ["button", `button--${variant}`, block ? "button--block" : "", className]
    .filter(Boolean)
    .join(" ");

  const iconNode =
    icon === "arrow" ? <ArrowRight /> : icon === "external" ? <ArrowUpRight /> : null;

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
        {iconNode}
      </a>
    );
  }

  return (
    <Link href={href as Route} className={classes} aria-label={ariaLabel}>
      {children}
      {iconNode}
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { useOutboundCapture } from "@/components/analytics/use-outbound-capture";

type ButtonVariant = "primary" | "secondary" | "text";

/** Generated text endpoints (llms.txt, robots.txt, sitemap.xml) are real
 *  files, not typed app routes — render them as plain anchors. */
function isStaticFile(href: string): boolean {
  return /\.(txt|xml)$/.test(href);
}

/**
 * Kirimo button vocabulary, all uppercase (the template's `Button` text style,
 * 16px / 500 / +0.04em):
 *
 * - `primary`   — terra-cotta filled pill (template `Button/Primary`).
 * - `secondary` — sand-outlined pill (template `Button/Secondary`, e.g.
 *                 "VIEW ALL PROJECT").
 * - `text`      — circle-arrow + uppercase label link (template `Button/Text`,
 *                 e.g. "GET STARTED NOW", "READ ABOUT US").
 *
 * Off-site / `mailto:` buttons emit the explicit `outbound_cta_click` event;
 * internal routes are left to `page_view`.
 */
export function Button({
  href,
  children,
  variant = "primary",
  external,
  className,
  tabIndex,
  analyticsLocation
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  tabIndex?: number;
  /** Optional non-PII funnel label for `outbound_cta_click` (e.g. "cta-panel"). */
  analyticsLocation?: string;
}) {
  const isExternal = external ?? (/^(https?:|mailto:)/.test(href) || isStaticFile(href));
  const classes = [`btn btn--${variant}`, className].filter(Boolean).join(" ");
  const handleClick = useOutboundCapture(href, { location: analyticsLocation });

  const content = (
    <>
      <span className="btn__arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true">
          <path
            d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="btn__label">{children}</span>
    </>
  );

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        tabIndex={tabIndex}
        onClick={handleClick}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href as Route} tabIndex={tabIndex}>
      {content}
    </Link>
  );
}

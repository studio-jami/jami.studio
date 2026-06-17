"use client";

import Link from "next/link";
import type { Route } from "next";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useOutboundCapture } from "@/components/analytics/use-outbound-capture";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  /** Optional non-PII funnel label for `outbound_cta_click` (e.g. "footer-social"). */
  analyticsLocation?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Route-aware anchor: internal app routes go through `next/link` (typedRoutes
 * cast), generated text endpoints (`.txt`/`.xml`) render as plain anchors, and
 * off-site/mailto links open safely. Hrefs always come from the content layer.
 *
 * Off-site and `mailto:` clicks emit the explicit `outbound_cta_click` event
 * (replay/autocapture stay OFF — this is the deliberate, named outbound signal).
 * Internal navigations are not instrumented here (covered by `page_view`).
 */
export function SmartLink({ href, children, analyticsLocation, onClick, ...rest }: SmartLinkProps) {
  const isInternalRoute = href.startsWith("/") && !/\.(txt|xml)$/.test(href);
  const handleClick = useOutboundCapture(href, { location: analyticsLocation }, onClick);

  if (isInternalRoute) {
    return (
      <Link href={href as Route} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

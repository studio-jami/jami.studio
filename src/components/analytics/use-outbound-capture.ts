"use client";

import { usePostHog } from "@posthog/react";
import { ANALYTICS_EVENTS, isOutboundHref, outboundChannel, outboundDestination } from "@/lib/analytics";

/**
 * Returns an `onClick` handler that emits `outbound_cta_click` for off-site /
 * mailto links. Internal routes simply pass through (the returned handler is a
 * no-op beyond any user `onClick`), so `next/link` navigations are untouched.
 *
 * Properties are deliberately non-PII: a sanitized destination, a coarse channel
 * (hostname or `email`), and an optional caller-supplied `location`/`label`
 * for funnel attribution (e.g. "header-nav", "footer-social", "cta-panel").
 *
 * Any user-supplied `onClick` is preserved and called first. Memoization is
 * handled by the React Compiler — no manual `useCallback` needed.
 */
export function useOutboundCapture(
  href: string,
  meta?: { location?: string; label?: string },
  userOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
) {
  const posthog = usePostHog();
  const outbound = isOutboundHref(href);

  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    userOnClick?.(event);
    if (!outbound || !posthog) return;
    posthog.capture(ANALYTICS_EVENTS.outboundCtaClick, {
      destination: outboundDestination(href),
      channel: outboundChannel(href),
      ...(meta?.location ? { location: meta.location } : {}),
      ...(meta?.label ? { label: meta.label } : {})
    });
  };
}

"use client";

import { usePostHog } from "@posthog/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

/**
 * Fires a pageview on first load and on every App Router client-side
 * navigation. Emits two events:
 *
 * - PostHog's native `$pageview` — powers the web-analytics / paths dashboards.
 * - our explicit `page_view` named event — the stable, contract-named event
 *   from the deferral decision, carrying only the path (no PII).
 *
 * `useSearchParams` must live under a Suspense boundary in the App Router, so
 * the inner tracker is wrapped below.
 */
function Tracker() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthog || !pathname) return;

    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    const url = typeof window !== "undefined" ? window.location.origin + path : path;

    // Native pageview for dashboards.
    posthog.capture("$pageview", { $current_url: url });
    // Explicit, contract-named event (no PII — path only).
    posthog.capture(ANALYTICS_EVENTS.pageView, { pathname, path });
  }, [posthog, pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}

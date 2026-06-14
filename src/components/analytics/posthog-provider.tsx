"use client";

import { PostHogProvider as PHProvider } from "@posthog/react";
import posthog from "posthog-js";
import type { ReactNode } from "react";
import { POSTHOG_INGEST_HOST, POSTHOG_KEY, POSTHOG_UI_HOST, posthogEnabled } from "@/lib/analytics";

/**
 * Initializes the PostHog **marketing** project on the client, under the
 * family analytics posture:
 *
 * - `autocapture: false` — no noisy DOM/click autocapture; we emit explicit,
 *   named events only.
 * - `disable_session_recording: true` — session replay OFF.
 * - `capture_pageview: false` — pageviews are captured manually on navigation
 *   (see `PageViewTracker`) so soft App Router navigations are counted and our
 *   explicit `page_view` event stays aligned with PostHog's `$pageview`.
 * - `respect_dnt: true` + `person_profiles: 'identified_only'` — consent-/
 *   cookieless-friendly and anonymous. No PII is ever sent.
 *
 * `api_host` is the **ingestion** host (`us.i.posthog.com`), derived from the
 * configured host; `ui_host` is the **app** host (`us.posthog.com`) for in-app
 * links. Pointing `api_host` at the app host would silently drop every event
 * (posthog-js only auto-rewrites the legacy `app.posthog.com` value).
 *
 * Init runs once at module scope (the documented PostHog pattern — guarded to
 * the browser and against double-init). If `NEXT_PUBLIC_POSTHOG_KEY` is absent
 * (e.g. local dev without env), PostHog is skipped and children render
 * unchanged.
 */
if (typeof window !== "undefined" && posthogEnabled && POSTHOG_KEY && !posthog.__loaded) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_INGEST_HOST,
    ui_host: POSTHOG_UI_HOST,
    // Explicit-events posture: replay + autocapture OFF.
    autocapture: false,
    disable_session_recording: true,
    // Manual pageviews (App Router soft navigations); pageleave kept for dwell.
    capture_pageview: false,
    capture_pageleave: true,
    // Cookieless/consent-friendly + privacy: anonymous, no PII, respect DNT.
    person_profiles: "identified_only",
    respect_dnt: true,
    // Exception capture is enabled at the project level (light); the SDK handles
    // uncaught errors — we add no manual handlers (avoids duplicates).
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") ph.debug(false);
    }
  });
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  if (!posthogEnabled) {
    return <>{children}</>;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

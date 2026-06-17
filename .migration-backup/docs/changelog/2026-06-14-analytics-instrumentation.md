# Analytics instrumentation (PostHog + GA4 + Vercel)

Date: 2026-06-14
Type: Added
Scope: instrumentation only (no content/feature changes)

Wired the marketing site to its analytics under the family privacy-leaning posture
(roadmap WS10), superseding the launch-time analytics deferral.

## What shipped

- **PostHog** (marketing project) via `posthog-js` + `@posthog/react`, client-initialized with
  **session replay OFF**, **DOM autocapture OFF**, manual pageviews (`capture_pageview: false`),
  `respect_dnt: true`, and `person_profiles: 'identified_only'`. No PII.
- **GA4** (marketing web stream `G-…`) via `gtag.js` (`next/script`, `anonymize_ip: true`).
- **Vercel** Web Analytics + Speed Insights (`@vercel/analytics/next`,
  `@vercel/speed-insights/next`).
- **Explicit named events** wired to real routes/CTAs: `page_view`, `project_index_view`,
  `project_detail_view`, `outbound_cta_click`.
- New deps: `posthog-js`, `@posthog/react`, `@vercel/analytics`, `@vercel/speed-insights`.
- Env: real publishable IDs added to the gitignored `.env`; tracked `.env.example` now lists the
  `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` / `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  placeholders (empty) and drops the stale deferral placeholders.

## Verification

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (23 tests incl. a new analytics contract suite),
  and `pnpm build` all green.
- Runtime (local production run): GA4 `page_view` beacons fire (HTTP 204); PostHog client
  confirmed initialized with the exact posture (live remote config: `autocapture_opt_out: true`,
  `session_recording: false`). PostHog server-side ingest was not observable from the local
  automation run — confirm in a production/preview browser.

See `docs/operations/analytics.md` for the durable posture, events, and env reference.

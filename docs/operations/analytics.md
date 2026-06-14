# Analytics And Privacy (Marketing Site)

Date: 2026-06-14
Status: Active operating note
Owner: Jamie

## Summary

`www.jami.studio` is instrumented for **product-insight analytics under a privacy-leaning,
cookieless-friendly posture**. This supersedes the launch-time
[analytics deferral](https://github.com/studio-jami/ops) (the "launch without analytics" gate
was satisfied; see the family
[analytics architecture decision](https://github.com/studio-jami/ops) in `_ops`,
roadmap WS10). Everything is env-driven and free-tier/credit-funded — no paid plan.

Three complementary, non-overlapping lenses:

| Tool | Role | Wiring |
| --- | --- | --- |
| **PostHog** (marketing project) | Web analytics + explicit conversion funnels (outbound-CTA) | `posthog-js` + `@posthog/react` provider, client-init in `src/components/analytics/posthog-provider.tsx` |
| **GA4** (marketing web stream) | Acquisition / SEO (Search Console linkage) | `gtag.js` via `next/script` in `src/components/analytics/google-analytics.tsx` |
| **Vercel** Web Analytics + Speed Insights | Core Web Vitals next to deploys | `@vercel/analytics/next` + `@vercel/speed-insights/next` in `src/app/layout.tsx` |

## Posture (authoritative)

- **Session replay: OFF.** `disable_session_recording: true`.
- **DOM autocapture: OFF.** `autocapture: false` — we ship only explicit, named events.
  (Confirmed live from the project's remote config: `autocapture_opt_out: true`,
  `session_recording: false`.)
- **No PII; never capture form-field contents.** The site has no forms, auth, billing, or
  newsletter capture. Event properties are limited to the path, a coarse outbound channel
  (hostname or `email`), and a non-PII funnel `location` label.
- **Cookieless/consent-friendly.** `respect_dnt: true` (honors Do Not Track),
  `person_profiles: 'identified_only'` (anonymous visitors get no person profile). GA4 is
  configured with `anonymize_ip: true`.
- **Pageviews are manual.** `capture_pageview: false`; the App Router `PageViewTracker`
  emits PostHog's `$pageview` plus our explicit `page_view` on every client-side navigation.

## Explicit events

| Event | Fires when | Where |
| --- | --- | --- |
| `page_view` | first load + every client-side navigation | `src/components/analytics/page-view-tracker.tsx` |
| `project_index_view` | `/projects` index is viewed | `ProjectViewBeacon` in `src/app/projects/page.tsx` |
| `project_detail_view` | `/projects/[slug]` is viewed (carries `slug`) | `ProjectViewBeacon` in `src/app/projects/[slug]/page.tsx` |
| `outbound_cta_click` | an off-site `http(s)` or `mailto:` link/button is clicked | `SmartLink` + `Button` via `useOutboundCapture` |

The event-name contract and the outbound/non-PII helpers live in `src/lib/analytics.ts` and are
covered by `tests/analytics-contract.test.ts`.

## Environment

Publishable client IDs only — real values live in the **gitignored** `.env` (and the Vercel
project env); tracked `.env.example` carries **empty** placeholders.

```
NEXT_PUBLIC_POSTHOG_KEY=        # PostHog marketing project (phc_…)
NEXT_PUBLIC_POSTHOG_HOST=       # https://us.posthog.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=  # GA4 marketing web stream (G-…)
```

If a key is absent the corresponding tool is skipped cleanly (PostHog/GA render nothing; the
Vercel components no-op off-Vercel), so local dev without env stays quiet.

## Notes & follow-ups

- The master `phc_*` / `G-*` IDs are captured in `_ops/.agents/.env` (operator scope); set the
  same `NEXT_PUBLIC_*` values in the Vercel project environment for production.
- Vercel's `/_vercel/insights/*` and `/_vercel/speed-insights/*` scripts 404 on localhost — they
  are served by the Vercel edge in production only.
- `capture_dead_clicks` shows enabled in the project remote config (a lightweight, separate signal
  from DOM autocapture). If a fully minimal footprint is preferred, disable dead-clicks at the
  project level — distinct from the replay/autocapture posture, which is OFF.

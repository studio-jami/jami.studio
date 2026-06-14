/**
 * Analytics contract for the marketing site.
 *
 * Posture (see `_ops/.../2026-06-14-analytics-architecture.md`, roadmap WS10):
 * PostHog **marketing** project with **session replay OFF** and **DOM autocapture
 * OFF** — only the explicit, named events below are emitted, plus PostHog's own
 * `$pageview`/`$pageleave` for web-analytics dashboards. No PII; never capture
 * form-field contents (the site has no forms). Consent-/cookieless-friendly.
 *
 * Event names are intentionally snake_case and match the original deferral
 * decision's named-event list so dashboards and funnels stay stable.
 */
export const ANALYTICS_EVENTS = {
  /** A page was viewed (emitted on first load and every client-side navigation). */
  pageView: "page_view",
  /** The `/projects` index was viewed. */
  projectIndexView: "project_index_view",
  /** A single project detail page (`/projects/[slug]`) was viewed. */
  projectDetailView: "project_detail_view",
  /** An outbound/off-site or mailto CTA was clicked. */
  outboundCtaClick: "outbound_cta_click"
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/** Public client config, read from `NEXT_PUBLIC_*` env at build/runtime. */
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.posthog.com";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** True when a PostHog publishable key is present (instrumentation is opt-in by env). */
export const posthogEnabled = Boolean(POSTHOG_KEY);
/** True when a GA4 measurement id is present. */
export const gaEnabled = Boolean(GA_MEASUREMENT_ID);

/**
 * Classify an href as an outbound CTA target: off-site `http(s)` links and
 * `mailto:` links. Internal app routes and generated text endpoints
 * (`.txt`/`.xml`) are not outbound. Kept here so link primitives and tests
 * share one definition.
 */
export function isOutboundHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:");
}

/** Coarse channel label for an outbound href — no PII, just the destination kind. */
export function outboundChannel(href: string): string {
  if (href.startsWith("mailto:")) return "email";
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "external";
  }
}

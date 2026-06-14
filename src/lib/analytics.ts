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
/**
 * The configured PostHog host. This is the **app/UI** host (e.g.
 * `https://us.posthog.com`) — what links in the SDK should point at, and the
 * value an operator naturally records. Ingest is routed separately (see below).
 */
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.posthog.com";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * PostHog separates the **app/UI host** (`us.posthog.com`) from the **event
 * ingestion host** (`us.i.posthog.com`). posthog-js only auto-rewrites the
 * legacy `https://app.posthog.com` value to the ingestion host; any other
 * `api_host` (including the app host `https://us.posthog.com`) is used verbatim,
 * which would POST events to the app host and **silently drop them**. So we
 * derive the ingestion host here and feed it to `api_host`, while the app host
 * stays as `ui_host`.
 *
 * - `https://us.posthog.com`  → `https://us.i.posthog.com`
 * - `https://eu.posthog.com`  → `https://eu.i.posthog.com`
 * - an already-correct ingest host (`*.i.posthog.com`) is returned unchanged
 * - a self-hosted/reverse-proxy host is returned unchanged (assumed to ingest)
 */
export function posthogIngestHost(host: string): string {
  const trimmed = host.trim().replace(/\/$/, "");
  // Already an ingestion host (…i.posthog.com) — leave as-is.
  if (/^https?:\/\/[a-z0-9-]+\.i\.posthog\.com$/i.test(trimmed)) return trimmed;
  // App host (us./eu./app.posthog.com) — insert the `.i` ingestion subdomain.
  const appHost = trimmed.match(/^(https?:\/\/)(us|eu|app)\.posthog\.com$/i);
  if (appHost) {
    const region = appHost[2].toLowerCase() === "app" ? "us" : appHost[2].toLowerCase();
    return `${appHost[1]}${region}.i.posthog.com`;
  }
  // Unknown / self-hosted host — assume it ingests directly.
  return trimmed;
}

/** Ingestion host for posthog-js `api_host` (where events are POSTed). */
export const POSTHOG_INGEST_HOST = posthogIngestHost(POSTHOG_HOST);
/** App/UI host for posthog-js `ui_host` (where in-app links resolve). */
export const POSTHOG_UI_HOST = POSTHOG_HOST.trim().replace(/\/$/, "");

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

/** Sanitized destination label for outbound events; never emit email addresses, paths, or query strings. */
export function outboundDestination(href: string): string {
  if (href.startsWith("mailto:")) return "email";
  try {
    return new URL(href).origin.replace(/^https?:\/\/www\./, (match) => match.replace("www.", ""));
  } catch {
    return "external";
  }
}

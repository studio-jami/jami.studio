# Analytics And Privacy Deferral

Date: 2026-06-13
Status: Accepted
Owner: Jamie

## Decision

Launch `www.jami.studio` without runtime analytics instrumentation.

PostHog Cloud is the deferred first-choice public analytics provider for the
marketing site because it can cover product-page funnels, outbound CTA clicks,
and later OSS launch loops from one provider. Amplitude remains a backup only if
program terms, credit availability, or data-export needs make it a better fit
at implementation time.

No analytics script, session replay, cookie banner, consent manager, or tracking
event is required for the launch deployment.

## Rationale

The launch gate is public availability and correctness: the Kirimo site, project
routes, canonical metadata, sitemap, robots, and AI-ingestion files are already
verifiable without browser-side analytics. Adding analytics before host-side
provider setup is confirmed would create a privacy and operational surface
without improving launch correctness.

The current site has no authentication, billing, newsletter capture, support
chat, or conversion workflow that requires event data before launch. External
HTTP smoke, Vercel deployment evidence, and route/metadata checks are enough to
prove the public marketing surface is shippable.

Deferral keeps the first impression non-invasive: no analytics cookies, no
session replay, no personal-data collection, and no third-party script execution
on launch.

## Future Instrumentation

When analytics is implemented, keep it minimal, env-driven, and transparent:

- Provider: PostHog Cloud unless a fresh decision changes the provider.
- Host/local names only: `NEXT_PUBLIC_ANALYTICS_PROVIDER` and
  `NEXT_PUBLIC_ANALYTICS_SITE_ID`.
- Initial event names: `page_view`, `project_index_view`,
  `project_detail_view`, and `outbound_cta_click`.
- Do not enable session replay, autocapture, ad identifiers, or cross-site
  identity stitching by default.
- Document any public privacy notice or consent requirement before enabling the
  production script.

## Consequences

- Launch can proceed without analytics because no launch route or deploy
  workflow depends on analytics data.
- Vercel project settings do not need analytics environment values for launch.
- `.env.example` may keep the optional analytics variable names as future
  placeholders, but tracked files must not contain provider keys or site IDs.
- Stream C closeout should record this deferral rather than leaving analytics as
  an open launch ambiguity.

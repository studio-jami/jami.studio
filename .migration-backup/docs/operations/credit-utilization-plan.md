# Credit Utilization Plan

Date: 2026-06-12
Status: Active planning surface
Owner: Jamie

## Purpose

Map accepted and candidate benefits to concrete development work across the Studio family without burning credits before the workload exists.

This plan works from `docs/operations/benefits-and-credits.md` and the admin benefits registry. It does not replace either source.

## Strategy

Use startup credits to accelerate real product surfaces, not to create infrastructure sprawl.

The order is:

1. Finish the `jami.studio` public site and route all project CTAs correctly.
2. Launch the first OSS surfaces for Intercal, Harness, and Registry.
3. Instrument the public and OSS launch loop.
4. Build internal admin visibility over benefits, support, and launch workflows.
5. Hold commercial cloud megastacks until `yrka.io` has a live workload and entity/account readiness.

## Credit Allocation

| Workload | Preferred benefit | Why |
| --- | --- | --- |
| Public site analytics | Amplitude, PostHog | Launch funnel, project page engagement, docs/search events |
| OSS repo and release hygiene | GitHub for Startups | Enterprise/Copilot/security features once welcome and terms are confirmed |
| Internal benefits/admin operations | Retool | Fast dashboards over program status, expiry windows, evidence queue, and support tasks |
| Launch/support surface | Intercom + Fin | Lightweight founder-led support, later Fin automation |
| Email launch loop | SendPulse | Newsletter, founder updates, program announcements, OSS release notes |
| Search and discovery | Algolia | Site/docs/project search after public content volume justifies indexing |
| Agent voice/interface demos | ElevenLabs, Anam | Demo-specific use only; avoid background burn |
| Batch/GPU experiments | DigitalOcean | Use for bounded demos or Intercal/Harness workloads after redemption proof |
| Event streaming | Confluent | Defer until real event volume or demo workload needs Kafka/Flink |
| Analytics warehouse | Snowflake | Defer until PostHog/Amplitude exports or Intercal analytics need a warehouse |
| Cross-tool automation | Make | Weekly burn-down, application follow-ups, partner publication checks |
| Edge and storage | Cloudflare, Vercel | Public hosting, R2/secrets, product previews, OSS program once eligible |
| Commercial AI/cloud | AWS, Google, Azure, Anthropic, Neon, Supabase | Reserve for `yrka.io` and hosted product workloads |

## First Operating Build

Build the smallest useful internal operating loop before adding new providers.

1. Normalize the admin benefits registry into a repeatable table shape.
2. Add fields for `owner_account`, `public_mention_allowed`, `logo_allowed`, `source_last_verified`, `credit_balance`, `credit_expires_at`, `next_action`, and `evidence_path`.
3. Generate a weekly summary from that table.
4. Feed the same table into a Retool dashboard or a lightweight local report.
5. Add Make only after the fields are stable enough to automate reminders.

## Launch Sequencing

### Now

- Keep the five design branches focused on site quality.
- Do not add a public support-partners page until the selected branch is merged and public routes are stable.
- Redeem only benefits that directly support the live launch: analytics, support, email, repo security, and admin visibility.

### After the marketing site is wrapped

- Add analytics events for `/`, `/projects`, and each project detail.
- Confirm GitHub for Startups welcome terms, org placement, and credit balance.
- Build the first Retool view over the benefits registry and application queue.
- Verify SendPulse and Intercom sender/domain setup before any public email or support claim.
- Prepare partner-support content as data-driven copy, not hardcoded page prose.

### After Intercal, Harness, and Registry launch surfaces are live

- Apply/redeem OSS-aligned programs that need public proof.
- Turn Algolia into real site/docs search if content volume warrants it.
- Use DigitalOcean/GPU credits only for bounded demos or reproducible workloads.
- Revisit Cloudflare/Vercel OSS programs with live OSS evidence.

### After `yrka.io` commercial lane is ready

- Revisit AWS, Google, Azure, Anthropic, Neon, Supabase, and larger cloud/AI programs.
- Spend one-time credits against real product infrastructure, not setup curiosity.
- Keep commercial account identity, billing, and tax/entity evidence separate from the OSS admin tree.

## Public Partner Strategy

A public support-partners page can help credibility and discovery, but it should not read like a badge wall or imply endorsements that are not granted.

Use one of these surfaces:

| Surface | When to use | Notes |
| --- | --- | --- |
| `Support Partners` page | Multiple verified partner/support relationships with logo/name permission | Best long-term fit |
| `Supported By` section | A small set of public, verified programs | Good after first launch |
| Changelog or launch post | One-time acknowledgement of a program | Good when a specific credit enabled a launch |
| Footer partner links | Only for stable, explicit public relationships | Keep subtle |

Required fields before publishing a partner:

- Program name
- Official URL
- Benefit category
- Public mention allowed
- Logo allowed
- Required attribution text
- Last verified date
- Internal evidence path

## Non-Goals

- Do not create provider accounts just because a credit exists.
- Do not publish private program terms.
- Do not claim partner endorsement unless terms or written approval allow it.
- Do not put implementation status in first-impression marketing copy.
- Do not build a master plaintext credential file.


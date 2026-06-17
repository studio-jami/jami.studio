# Benefits And Credits Operating Index

Date: 2026-06-12
Status: Active operating index
Owner: Jamie

## Purpose

This is the readable operating index for startup credits, partner programs, grants, and account benefits that support the `jami.studio` OSS lane.

The detailed evidence store lives outside the public marketing-site repo at:

- `C:\Users\james\dev\orgs\oss\admin\benefits\`
- `C:\Users\james\dev\orgs\oss\admin\applications\`

This repo only keeps safe operating guidance, public-site strategy, and cross-project routing. Do not copy redemption links, tokens, private emails, account IDs, invoices, or billing screenshots into tracked `jami.studio` files.

## Current Source Stack

| Source | Role | Handling |
| --- | --- | --- |
| Live Google Sheet (https://docs.google.com/spreadsheets/d/1fW6haTs1f3nSmAaJXmrRSf2JP3BdJcDsiyNWbMaZIB8/edit?usp=sharing) | Master tabular registry — status, values, dates, expiries, referrals, Fin queue, candidates. Auto-updated on schedule by Gemini parsing james@jami.studio Gmail | Primary live source for all tabular facts and expiry clocks. Published CSV on the Registry tab is the zero-secret consumption seam. |
| `admin/benefits/registry.md` + `programs/` | Rich annotated view + per-program deep notes, fit, checklists, redemption details | Durable git layer for long-form context (Sheet is the live table) |
| `admin/benefits/programs/` | Per-program benefit notes | Human-editable program records |
| `admin/applications/pipeline/startup-pipeline-status.md` | Application queue and next actions | Working queue |
| `admin/applications/submitted/` | Submitted application copy | Keep private/admin scoped |
| `admin/applications/evidence/` | PDFs, invoices, promo docs, supporting material | Keep out of public repo |
| `docs/operations/credit-utilization-plan.md` | How credits should map to product work | Repo-local planning surface |
| `docs/security/agent-account-access.md` | Agent access, vaulting, grants, and audit model | Security operating contract |

## Active Benefit Snapshot

This table is derived from the admin registry last updated 2026-06-11. Verify vendor dashboards or emails before spending, committing durable copy, or publishing a partner claim.

| Program | Lane | Current status | Primary use |
| --- | --- | --- | --- |
| Fin AI Startup Pack | OSS | Unlocked | Umbrella partner redemption queue |
| Retool for Startups | OSS | Active | Internal ops dashboards, workflow review apps, referral leverage |
| GitHub for Startups | OSS and future commercial | Approved, welcome pending | Enterprise/Copilot/security credits after email confirmation |
| Amplitude Startup Scholarship | OSS | Active | Product analytics and launch funnel instrumentation |
| SendPulse Startup | OSS | Credited | Launch email, lightweight marketing automation |
| PostHog for Startups | OSS | Active, billing balance needs confirmation | Product analytics, flags, session replay |
| Miro Startup | OSS | Accepted, amount needs confirmation | Planning boards and architecture maps |
| Confluent for Startups | OSS | Accepted | Future event streaming proof only when workload exists |
| Intercom + Fin | OSS | Active trial | Support surface and Fin/Intercom program redemption |
| ElevenLabs Startup Grants | OSS | Applied | Voice demos and agent interface experiments |
| Algolia Startup | OSS | Applied | Search over site, docs, registry, and Intercal public knowledge |
| DigitalOcean via Fin | OSS | In progress | GPU and batch compute after verification |
| Make Startup | OSS | Ready | Cross-tool automation and benefit burn-down jobs |
| Snowflake Accelerator | OSS | Ready | Future analytics plane, not early burn |
| AWS Activate, Google for Startups, Azure Founders Hub | Commercial | Candidate | Hold for `yrka.io` workload and entity/account readiness |

## Weekly Operating Loop

1. Refresh the admin registry from account dashboards and acceptance emails.
2. Update exact credit balance, start date, expiration, owner account, and redemption state.
3. Move any completed applications into the correct admin subdirectory.
4. Reconcile the expiry reminders against the next 90, 30, and 7 day windows.
5. Update `credit-utilization-plan.md` when a credit becomes usable for a real workload.
6. Publicize support only when partner terms, logo rules, and live account evidence are verified.

## Automation Targets

The first automation pass should avoid scraping secrets. It should read structured, human-maintained records and produce reminders or summaries.

| Automation | Input | Output |
| --- | --- | --- |
| `weekly-benefits-summary` | `admin/benefits/registry.md` plus per-program docs | Markdown summary of active balances, expirations, blocked confirmations |
| `expiry-watch` | Expiry table in registry | 90/30/7 day reminders |
| `application-queue` | `admin/applications/pipeline/startup-pipeline-status.md` | Next-actions list grouped by submit, redeem, verify, follow up |
| `partner-publication-check` | Program doc fields for public mention and logo permission | Public/support-partner candidates only after verification |
| `credit-fit-map` | Registry plus `credit-utilization-plan.md` | Recommended spend plan by product lane |

## Update Rules

- Keep exact secret values and private redemption URLs out of git.
- Mark any unverified account value as `TBD` or `confirm in dashboard`.
- Separate accepted, applied, ready, denied, and candidate statuses.
- Do not mix personal subscriptions into startup credit burn-down totals.
- Do not burn one-time commercial cloud credits until the `yrka.io` commercial surface has a real workload.
- Re-verify vendor terms before public claims, durable docs, or partner pages.


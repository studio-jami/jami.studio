# Documentation Standards

Durable docs should make jami.studio easier to build, operate, and hand off
without becoming a second implementation surface. The live repo remains the
source of truth.

## Ownership

- Site code, generated routes, public metadata, `robots.txt`, sitemap output,
  `llms.txt`, content data, tests, and deployment artifacts own executable truth.
- System/architecture docs explain ownership, data flow, and execution paths.
- Operations docs explain how to perform a task safely.
- Integration/provider docs explain analytics, deployment, forms/email, docs
  links, and subdomain routing setup state.
- Research/feasibility docs are source reports, not task lists or operating policy.
- Roadmaps hold active implementation steps and retire to `docs/_legacy/roadmaps/`.

## Link Policy

- Prefer links to stable directories and source-owned files.
- Avoid links from durable docs to dated roadmap files. The `docs/roadmaps/`
  directory can hold the active plan; durable docs should not hardcode a dated
  plan as current guidance.
- Legacy links are allowed only when a doc is explicitly describing history.
- Do not add subdirectory README files except where a directory owns executable
  truth or a stable operating index. Use `docs/README.md` as the docs index.

## Drift Controls

- Do not duplicate project rosters, route maps, repository URLs, subdomain
  targets, analytics IDs, framework versions, provider limits, or volatile
  status tables in durable docs when those values can live in source data or
  deployment configuration.
- If a value is expected to change with setup or runtime status, point to the
  content source, deployment config, official provider docs, or a status
  artifact instead.
- Verify drift-prone external facts against official provider sources before
  changing framework, deployment, domain, analytics, pricing, licensing,
  protocol, or provider-access claims.
- Do not promote a framework, provider, domain-routing, analytics, dependency,
  or protocol claim to stable without recorded evidence.

## Status Handling

- Status docs record commands, dates, outputs, provider-access failures, and
  safety checks when they matter.
- Status docs are not the primary operating guide. If a status record creates a
  lasting rule, promote the rule into a system or operations doc.
- Never write API keys, tokens, signed URLs, connection strings carrying
  credentials, or any secret into docs, fixtures, adapter config, contracts,
  metadata, screenshots, or logs.

## Retirement

- Move completed or superseded plans to `docs/_legacy/roadmaps/`.
- Move obsolete research or task notes to `docs/_legacy/research/`.
- When retiring a doc, repair active links and keep only the stable rule in the
  durable doc that owns it.
- Do not leave hidden open decisions in prose. Put them in an active roadmap,
  report, status note, or decision record.

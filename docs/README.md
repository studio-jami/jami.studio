# Documentation

This directory holds the durable operating guidance for the `jami.studio` marketing-site repo.

## Map

- `architecture/` - durable product, routing, content, AI-readiness, and deployment shape.
- `decisions/` - durable decisions and rationale.
- `engineering/` - local pointers to canonical planning, report, docs, and agent standards,
  plus project-specific design/state records.
- `operations/` - deployment, domains, benefits, analytics, and maintenance runbooks.
- `security/` - account access, secrets, and agent authorization guidance.
- `roadmaps/` - active implementation plans.
- `changelog/` - dated fragments for production-meaningful changes.

## Active plan

The active implementation plans live under `docs/roadmaps/`; superseded plans are deleted (git history
is the archive — the repo keeps no `_legacy/` shelf). Session and orchestration pointers live under
`docs/engineering/agents/`; canonical goal/reliability docs live in `_ops/projects/jami.studio/planning/agents/`.
Design guidelines live in `docs/design/`.

Key architecture notes:

- `docs/architecture/product-shape.md`
- `docs/architecture/ui-registry-token-foundation.md`

Key operating notes:

- `docs/operations/analytics.md`
- `docs/operations/benefits-and-credits.md`
- `docs/operations/credit-utilization-plan.md`
- `docs/security/agent-account-access.md`

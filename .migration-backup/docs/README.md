# Documentation

This directory holds the durable operating guidance for the `jami.studio` marketing-site repo.

## Map

- `architecture/` - durable product, routing, content, AI-readiness, and deployment shape.
- `decisions/` - durable decisions and rationale.
- `engineering/` - source-owned engineering docs only. Canonical planning, report, and
  agent standards live in `_ops/planning/`.
- `operations/` - deployment, domains, benefits, analytics, and maintenance runbooks.
- `security/` - account access, secrets, and agent authorization guidance.
- Active implementation plans live in `_ops/planning/jami.studio/roadmaps/`.
- `changelog/` - dated fragments for production-meaningful changes.

## Active plan

The active implementation plans live under `_ops/planning/jami.studio/roadmaps/`; superseded plans are
retired in `_ops/planning/jami.studio/_legacy/` or deleted from this product repo when their durable
rules are promoted. Session and orchestration pointers live under `_ops/planning/jami.studio/agents/`.
Design guidelines live in `docs/design/`.

Key architecture notes:

- `docs/architecture/product-shape.md`
- `docs/architecture/ui-registry-token-foundation.md`

Key operating notes:

- `docs/operations/analytics.md`
- `docs/operations/benefits-and-credits.md`
- `docs/operations/credit-utilization-plan.md`
- `docs/security/agent-account-access.md`

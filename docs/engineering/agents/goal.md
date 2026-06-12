# Goal — jami.studio Roadmap Completion

Date: 2026-06-12
Status: Active orchestrator prompt for roadmap completion
Owner: Jamie

## Current State

The design bakeoff is closed. Kirimo is selected, imported to `main`, committed, and pushed.

Current public-site baseline:

- Branch: `main`
- Latest launch-design commit: `25e5b73 feat: launch Kirimo marketing design`
- Roadmap clarification commit: `e9dbd3c docs: clarify Kirimo launch path`
- Active implementation roadmap: `docs/roadmaps/2026-06-06-jami-studio-marketing-site-plan.md`
- Closed design brief: `docs/engineering/agents/design-goal.md`
- Design decision: `docs/decisions/2026-06-12-design-direction-kirimo.md`
- Local verification already passed after import: `pnpm verify`
- Browser smoke already passed for `/`, `/projects`, all five `/projects/[slug]`, `/robots.txt`,
  `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`

The old design-lane worktrees and local design branch were removed. Remote design branches remain on GitHub
as version-control history. Do not recreate local losing-lane worktrees unless the owner explicitly asks.

## Mission

Finish the original marketing-site roadmap from the current `main` baseline. The work is no longer a design
bakeoff. The remaining work is Workstream 6 plus honest closeout:

1. Verify the current Kirimo site as the production candidate.
2. Complete deployment/domain operations docs and any required deployment configuration.
3. Decide or explicitly defer analytics/privacy with a decision record.
4. Check preview/production deployment and live domain behavior.
5. Update roadmap/docs to match what is actually proven.
6. Commit and push intentional changes.

## Non-Negotiables

- Do not redesign the marketing site. Kirimo is the selected public presentation.
- Do not bring back older marketing layouts or generic SaaS/grid designs.
- Do not redesign individual project pages before launch. Current Kirimo project routes can ship if verified.
- Do not let Studio UI Registry styling constraints override the marketing site. The registry is a separate
  product/runtime surface; this site keeps shared content, route, metadata, token, and AI-ingestion contracts.
- Do not implement Harness, Studio UI Registry, Orchestra, Intercal, or Collectiva runtimes here.
- Do not commit secrets, tokens, deploy credentials, analytics keys, private terms, or local `.env` values.
- Leave unrelated untracked local tooling/docs alone unless a stream explicitly owns them.

## Source Of Truth Order

1. Live code on `main`, generated routes, metadata, `robots`, `sitemap`, `llms.txt`, and browser behavior.
2. `AGENTS.md`.
3. `docs/roadmaps/2026-06-06-jami-studio-marketing-site-plan.md`, reading the Recovery note first.
4. Durable docs under `docs/architecture/`, `docs/operations/`, and `docs/decisions/`.
5. `docs/engineering/standards/*`.

Roadmap prose can be stale. Verify against the live repo and deployed/local surfaces before marking anything
complete.

## Remaining Workstreams

### Stream A — Production Candidate Audit

Audit the current `main` site without redesigning it.

Required checks:

- `pnpm verify`
- Browser smoke for `/`, `/projects`, all five project pages, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
  and `/llms-full.txt`
- Desktop and mobile visual smoke
- Metadata/canonical inspection for `/`, `/projects`, and one representative project page
- Secret scan of tracked files
- Confirm no screenshots, design-bakeoff leftovers, or local helper logs are being introduced

Fix only launch-grade defects: broken routes, missing assets, layout breakage, accessibility/focus issues,
metadata/AI regressions, bad CTA routing, placeholder/status copy, or clear Kirimo template-fidelity gaps.

### Stream B — Deployment And Domains

Bring `docs/operations/deployment-and-domains.md` current with the Kirimo import and real host shape.

Verify or document:

- Vercel project/build settings
- `www.jami.studio` production mapping
- apex `jami.studio` redirect behavior
- project subdomain ownership plan: `intercal`, `harness`, `registry`, `orchestra`, `collectiva`
- preview deployment path
- rollback instructions
- required environment variable names only

Do not put real credentials in tracked files.

### Stream C — Analytics And Privacy

Either implement the selected public analytics setup or explicitly defer it in `docs/decisions/`.

If implementing, keep it minimal and transparent:

- document provider and event names
- keep keys in host/local env only
- avoid invasive tracking
- verify no build/runtime regressions

If deferring, make the decision explicit so launch is not blocked by ambiguity.

### Stream D — Roadmap Closeout

Update roadmap and durable docs after verification, not before.

Required closeout:

- Mark Workstream 5 status according to the already-imported Kirimo design.
- Mark Workstream 6 tasks only when deployment/domain/analytics evidence exists or is explicitly deferred.
- Keep project-page redesign post-launch.
- Keep design-goal closed and do not use it as the active prompt.
- Commit and push only intentional files.

## Suggested Subagent Prompts

Use focused subagents. Each agent must audit and fix within its lane; no read-only reports unless explicitly
asked.

### Production Candidate Audit

```text
You own the production-candidate audit for `jami.studio` on `main`. Read `AGENTS.md`, this goal doc, and the
Recovery note at the top of `docs/roadmaps/2026-06-06-jami-studio-marketing-site-plan.md`. Kirimo is already
imported and selected; do not redesign it.

Audit live code and local browser behavior. Run `pnpm verify`, smoke `/`, `/projects`, every project page,
`/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/llms-full.txt`, inspect representative metadata, check
desktop/mobile visuals, and scan tracked files for secrets. Fix launch-grade defects only. Commit and report
the commit SHA, verification evidence, and remaining risks.
```

### Deployment And Domain Closeout

```text
You own Workstream 6 deployment/domain closeout for `jami.studio`. Read `AGENTS.md`, this goal doc,
`docs/operations/deployment-and-domains.md`, and the Recovery note in the main roadmap. Verify the current
Vercel/build/domain shape where credentials are already available; otherwise document exact unverified state
without inventing proof.

Update deployment/domain docs, `.env.example` names if needed, and roadmap status only for proven or
explicitly deferred items. Do not expose secrets. Commit and report verification evidence, commit SHA, and
any remaining external checks.
```

### Analytics / Privacy Decision

```text
You own the analytics/privacy lane for `jami.studio`. Read `AGENTS.md`, this goal doc, the main roadmap, and
`docs/operations/credit-utilization-plan.md` if present. Decide whether launch needs analytics now or whether
it is explicitly deferred.

If implementing, keep it minimal, env-driven, documented, and verified. If deferring, write a decision record
that names the deferred provider choice and why launch can proceed. Do not add secrets. Commit and report the
decision, changed files, verification result, and commit SHA.
```

## Done

The roadmap is complete when the public Kirimo site is verified, deployment/domain behavior is proven or
truthfully documented, analytics/privacy is implemented or explicitly deferred, roadmap/docs reflect the
actual evidence, and all intentional changes are committed and pushed.

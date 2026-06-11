# Orchestrator Goal — jami.studio

This document is the orchestrator's standing brief. It is for the coordinator only; subagents work
from the active roadmap, not from this file.

**Active roadmap:** `docs/roadmaps/2026-06-09-jami-studio-marketing-rebuild.md`

## Mission

The shared site foundation (Next.js app, token/dial contract, centralized content registry,
route/metadata helpers, generated robots/sitemap/`llms` surfaces) is built and lives on `main`. The
current visual design is not acceptable. The mission is to rebuild the landing and marketing site to a
world-class, production-grade, design-studio standard while reusing the shared data contracts and token
system verbatim.

The rebuild runs as five complete, parallel design-direction branches from the same `main` foundation
commit, each on its own pushed branch, built by heterogeneous models: two Claude Opus 4.8, one Claude
Fable 5, one Gemini, and one Grok. Each branch is a full, fresh rebuild of the landing and marketing
pages — entirely new UI, reusing only the shared data/token contracts — with an elevated,
distraction-free, design-agency/portfolio aesthetic (dark grainy-textured or clean editorial), dark and
light themes, and full responsive behavior across mobile, tablet, and desktop. The Studio UI Registry
and Jami Agent Harness must be first-class, with data-driven routing to `registry.jami.studio` and
`harness.jami.studio`.

When the branches are complete and gated, the owner selects one direction; the orchestrator then
merges and hardens it. A fresh-context Claude Fable 5 adversarial agent audits the entire effort at
closeout, treated like additional fresh passes, and its required findings are resolved before the run
closes.

The acceptance bar is the active roadmap's verification ladder: nothing closes unless it is 100%
passing. No shortcuts, no blockers, no slop.

## Your Role: The Orchestrator

You are the orchestration agent for `jami.studio`. Coordinate execution of the active plan using the
live repository as source of truth, not stale plan claims.

The orchestrator is not an implementation worker. Its job is to protect the main context window,
sequence the work, dispatch focused agents, collect their results, and keep the roadmap/status
picture coherent. The orchestrator must not personally audit workstreams, search the repo for
implementation details, write code, edit docs outside this prompt file, or run verification as the
primary worker. Work is done by short-lived subagents.

Follow `docs/engineering/agents/orchestration-reliability.md` during every subagent-coordinated
goal run. The coordinator must keep the run resumable from repo state and must not rely on one long
subagent wait as the only source of progress. A timed-out poll is not a stopping point: keep polling
until every dispatched subagent returns a terminal result, is explicitly closed, or is replaced by a
new checkpointed dispatch.

The repo's owned surfaces:

- `src/app/` or `app/` - public routes for the main marketing site.
- `src/content/` - project, page, navigation, SEO, CTA, FAQ, and AI-ingestion content.
- `src/components/` - reusable marketing sections, project cards, nav, footer, metadata helpers,
  and layout primitives.
- `src/lib/` - URL, route, metadata, sitemap, `llms.txt`, and content helpers.
- `src/tokens/`, `src/registry/`, or equivalent - shared token/dial contract and registry-ready
  metadata.
- `public/` - icons, social images, robots assets, and static files.
- `docs/` - architecture, operations, decisions, roadmaps, research, and engineering standards.

See the active plan's "Implementation Order" and "Cross-Stream Dependency Map" for sequence and
what parallelizes.

## End Product Shape

The target is a polished, production-ready public hub for the Studio OSS project family, live at
`https://www.jami.studio/`:

- A main landing page for the Studio platform and OSS ecosystem.
- Project pages for Jami Agent Harness, Studio UI Registry, Orchestra, Intercal, and Collectiva.
- AI-friendly public surface with canonical metadata, sitemap, robots, `llms.txt`, and a compact
  source bundle for agents.
- Data-driven routing and link ownership so each project can live in its own repository, Vercel
  project, docs/API surface, and subdomain without rewriting the marketing site.

The site should read as the full intended end-state public surface, not a dated progress log. It may
link to live surfaces where they exist, especially Intercal, but primary copy should avoid readiness
disclaimers and placeholder language.

Use subagents for all workstream audit/execution. Every workstream prompt must say `AUDIT/EXECUTE`,
and every workstream must receive at least two fresh-context passes before the orchestrator considers
it ready to close. If a second pass finds meaningful gaps, dispatch additional fresh-context passes
until the stream is quiet or a real external blocker is identified.

When the orchestrator needs more information, a fix, a verification result, or a narrowed
investigation, it must dispatch a short-lived subagent for that exact need. If the reusable
copy/paste prompt needs extra specificity, append a small text block with the added instruction for
that dispatch only; do not mutate the base prompt into a one-off variant. The orchestrator
coordinates and routes work. It does not perform the work.

## Source-Truth Rules

- The roadmap is a guide, not proof. Check the live repo before marking any task done.
- `AGENTS.md` owns repo operating rules.
- `docs/engineering/standards/*` owns planning/report/docs style.
- Source reports in `C:\Users\james\dev\docs\reports\` are planning inputs, not implementation
  proof.
- Keep product status and implementation caveats out of marketing copy unless they are intentionally
  exposed in docs.
- Keep all route, repo, subdomain, docs, CTA, social, repository, metadata, and project-card data
  centralized.
- Do not implement the Harness, Studio UI Registry runtime, Orchestra runtime, Intercal runtime, or
  Collectiva runtime in this repo.
- Future durable architecture/operations docs belong under `docs/architecture/`,
  `docs/operations/`, and `docs/decisions/`; do not duplicate repo-wide style guides beneath them.
- Never write secrets, private account details, analytics keys, deploy tokens, or provider
  credentials into tracked files.

## Account And Secret Lanes

Keep these lanes separate:

- **Automation/operator scope**: credentials/connected tools the agent needs to execute and deploy
  (GitHub repo access, Vercel access, DNS/provider dashboards, analytics dashboards). Development
  and deployment authority; not product runtime auth.
- **App runtime secrets**: values the app reads at runtime or build time. They live ONLY in local
  `.env` (gitignored), Vercel env, GitHub Actions secrets, or the host secret store - never in
  tracked files.

Do not choose product secret-handling architecture just to satisfy automation scope. If the agent
lacks dashboard/account permission, call out the missing operator access directly. `.env` is
gitignored and dev-only; `.env.example` documents names only.

## Workstream Execution Loop

The orchestrator's job is to keep the work moving. The reusable prompt below already tells each
subagent how to work - don't restate it here, don't second-guess it, don't run the work yourself.

Per workstream:

1. Dispatch a fresh-context subagent with the reusable prompt.
2. When its commit lands, dispatch the second fresh-context pass.
3. When the second commit lands, gate the workstream on it. Only here does the orchestrator exercise judgment.

If a pass needs extra context the reusable prompt doesn't cover, append a short text block to the top
of that one dispatch. Don't mutate the base prompt.

### Gating the second commit

Read the second commit's diff at the summary level - `git show --stat <sha>` and the commit body.
Don't comb the code; the subagent was already in the weeds, so trust its commit as the signal.

**Hard gate (numeric):**

- <= 10 files changed AND < 800 LOC changed -> eligible to close, continue to the contents check.
- > 10 files changed OR >= 800 LOC -> not eligible. Dispatch another fresh-context pass and re-gate
  on its commit. Repeat until the numeric gate passes.

**Contents check (judgment):** once the numeric gate passes, classify the second commit's character:

- **A - Continuation:** large refactor, new feature work, broad rewrites, big structural changes.
  The stream is still mid-flight. Dispatch another pass.
- **B - Completion + tests:** work that finishes earlier scaffolding plus the tests/docs proving it.
  One more pass to confirm quiet.
- **C - Tests + small doc/cleanup:** the stream has stabilized. Close it out.

After class C, do the closeout pass yourself: confirm the roadmap reflects reality, confirm
`git status` is clean, summarize. If you're between B and C, dispatch one more pass - the cost of a
quiet third pass is small; the cost of closing a stream that wasn't actually done is large.

This is the only place the orchestrator makes on-the-fly calls. Everywhere else, trust the prompt
and the agents.

### When using subagents

- Dispatch one workstream at a time unless streams are independent and have disjoint ownership.
- Never run two agents on the same workstream simultaneously.
- Tell each agent which workstreams are active so they stay in their lane.
- Each prompt must include both `AUDIT` and `EXECUTE`.
- Run each workstream at least twice with fresh context. A quiet second pass means the stream is
  likely ready to close; substantial changes in pass two mean dispatch another pass.
- Immediately after every dispatch, update the active roadmap with the agent id, workstream/pass,
  ownership boundary, dispatch timestamp, and next coordinator action.
- Immediately after every returned result, update the orchestrator log under
  `docs/engineering/agents/orchestrator-logs/` with status, changed files, verification, blockers,
  and any other relevant information worth logging.
- If a wait does not return or the coordinator session is interrupted, resume from the roadmap
  checkpoints plus visible git state.
- Keep orchestrator-side repo inspection to routing-level orientation only. Do not let the
  orchestrator become the auditor, search worker, implementer, or verifier.
- For information gaps, fixes, doc updates, test runs, provider checks, and repo searches, dispatch
  a short-lived subagent instead of doing the work in the orchestrator context.
- Keep the reusable prompt stable. Add dispatch-specific constraints as a small appended text block,
  not by rewriting the base prompt.

## Closeout Expectations

Before final response:

- Stop any helper processes started during the session.
- Confirm no secrets were written to tracked files or command output artifacts.
- Keep the active roadmap and durable docs accurate.
- Leave unrelated dirty/untracked files untouched.
- Report verification run and result.
- Report any commands that could not run because the app surface does not exist yet.
- Stage only intentional changes, write a conventional-style commit subject with a HEREDOC body, and
  `git push origin main` when a git remote exists.

## Reusable Workstream Prompt

```text

Working from: `docs/roadmaps/2026-06-09-jami-studio-marketing-rebuild.md` (active roadmap). The
live repository is the source of truth, not roadmap claims.

<APPEND YOUR WORKSTREAM STEERING HERE>

Please AUDIT/EXECUTE Workstream <N>, aiming for completeness and cohesion, using the live codebase as
the source of truth rather than roadmap claims. Preserve the marketing-site boundary: this repo owns
the public hub, project pages, shared content, routing, metadata, sitemap, robots, AI-ingestion
files, token/dial foundation, deployment docs, and visual system; it does not implement the Harness,
Studio UI Registry runtime, Orchestra runtime, Intercal runtime, or Collectiva runtime.

Finish adjacent docs/tests/config updates that clearly belong to the same shipped loop, but leave
unrelated user changes untouched.

Read the relevant repo guidance before editing:
- `AGENTS.md`
- the active dated plan
- `docs/engineering/standards/*`, relevant `docs/architecture/*`, `docs/decisions/*`, and
  `docs/operations/*`
- any owning routes, components, content registries, token contracts, metadata helpers, generated
  file helpers, tests, and docs for this workstream

Implementation standards:
- Windows dev host: use PowerShell/cmd or git-bash; use `rg` for search.
- Keep route, repo, subdomain, docs, API, CTA, social, metadata, and project-card data centralized.
- Keep public copy polished, direct, and developer-credible; avoid placeholder phrasing,
  implementation apologies, launch excuses, and "coming soon" framing.
- Keep implementation status out of primary marketing copy. Status belongs in docs, changelog, or
  operations notes.
- Keep the shared token/dial system registry-ready; do not hardcode one-off styling where a token
  role belongs.
- Make the site AI-friendly by design: canonical metadata, sitemap, robots, structured metadata,
  stable URLs, clean headings, `llms.txt`, and a compact source bundle.
- Do not introduce mocks, fake public claims, hidden demo data, secrets, analytics keys, deploy
  tokens, or private notes.
- Verify drift-prone framework/provider/API/protocol/domain facts against official sources before
  locking them in.

Verification (run the narrowest complete set for what you touched):
- Docs-only: read back changed Markdown and run `git diff --check`.
- TypeScript/app: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- Full gate: `pnpm verify`.
- Visual/frontend: smoke desktop and mobile routes after meaningful frontend changes.
- Public files: inspect `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and canonical metadata when
  those surfaces are touched.

Before final response:
- Stop helper processes started during the session.
- Update the active roadmap and durable docs accurately.
- Stage only intentional changeset, write a conventional-style commit subject and HEREDOC body, and
  `git push origin main` when a git remote exists.
- Summarize changed files, verification, unavailable commands, remaining blockers, and commit SHA(s)
  + push result.
```

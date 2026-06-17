# Agent Account Access

Date: 2026-06-12
Status: Active security operating contract
Owner: Jamie

## Purpose

Define how agents get complete operational access to the accounts needed for Studio work without creating a brittle shared master key.

Full access means agents can perform the required work end to end through provisioned roles, service accounts, OAuth connections, CLIs, and vault-backed secrets. It does not mean tracked plaintext credentials, browser cookie dumps, root tokens in repo files, or one unrecoverable credential bundle.

## Access Model

| Layer | Contract |
| --- | --- |
| Human owner | Jamie remains the account owner and recovery authority |
| Agent identity | Agents use named service accounts, apps, OAuth grants, or scoped tokens |
| Secret storage | Secrets live in a vault or provider secret store, not in tracked files |
| Local injection | Tools receive secrets through environment variables, CLI auth, or short-lived session material |
| Audit | Every privileged account should preserve logs or a manual activity record |
| Revocation | Each agent/tool grant must be individually revocable |

## The Master-Key Decision

Do not build a single collected plaintext "master key" for all accounts.

The durable version of that goal is an access broker:

1. A central inventory of accounts and capabilities.
2. A vault that stores secrets by lane and provider.
3. Named service accounts or OAuth apps for automation.
4. Local tooling that can request the exact credential needed for a task.
5. Audit and rotation workflows.

This preserves full agent access while avoiding a single file or token that can compromise every account.

## Vault Shape

Target vault grouping:

| Vault or collection | Scope |
| --- | --- |
| `studio-oss` | `jami.studio`, Intercal, Harness, Registry, Orchestra, Collectiva |
| `studio-commercial` | `yrka.io` commercial lane |
| `studio-personal` | founder brand and personal subscriptions |
| `studio-shared-readonly` | low-risk read-only metadata and public account inventory |
| `studio-breakglass` | recovery material, human-only by default |

Each secret item should include:

- Provider
- Account or org
- Lane
- Environment
- Capability
- Rotation date
- Owner
- Where it is used
- Public-safe contact or billing notes

## Agent Grant Types

| Grant type | Use |
| --- | --- |
| GitHub App | Scalable repo automation, preferred over many personal tokens |
| Fine-grained PAT | Narrow repo/API work when GitHub App is not practical |
| Provider service account | Cloud, deploy, database, email, analytics automation |
| OAuth connector | Gmail, Drive, Calendar, Notion, Linear, and similar user-mediated APIs |
| CLI session | Local operator work where provider CLI is the official control surface |
| Secret-store environment sync | CI/CD and hosted runtime injection |

## Minimum Viable Access Broker

1. Create the account inventory as a private admin doc or YAML outside the public repo.
2. Add provider, lane, org, login URL, owner email, auth method, and grant status.
3. Add vault references, not secret values.
4. Create service accounts for high-use providers before issuing broad personal tokens.
5. Add a weekly access check: expired tokens, broken OAuth grants, missing dashboard access, and unrotated secrets.
6. Keep breakglass recovery human-owned.

## Boundaries

- Never commit `.env` values, cookies, recovery codes, OAuth refresh tokens, invoices with sensitive account data, or private redemption links.
- Never move browser cookie stores into project docs.
- Never weaken provider account protections to make automation easier.
- Prefer official provider APIs, CLIs, apps, and service accounts.
- When a provider exposes destructive tools, run them only when the task explicitly requires it and the target account/project is verified.

## Official Guidance Targets

Use current provider guidance before implementation:

- GitHub Apps or fine-grained personal access tokens for GitHub automation.
- Provider service accounts for cloud and database automation.
- 1Password, Doppler, provider secret stores, or an equivalent vault for automation secrets.
- NIST-style least-privilege and account-management controls as the baseline for how grants are shaped, reviewed, and revoked.


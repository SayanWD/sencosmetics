# AI-Assisted Coding Guide

Goal: Enable production-grade code generation by providing rich, precise context to the AI.

## Golden Rules
- Be specific: What to build, where it lives (file paths), and constraints.
- Provide references: links/paths to related files, APIs, schemas, designs.
- Include client specs from `client/` when relevant (overview, SPEC_TZ).
- Define acceptance criteria and test expectations.
- State non-functional requirements: performance, a11y, SEO, i18n.
- Never include secrets; use placeholders for ENV.

## Prompt Structure (Template)
```
Task: [Clear, scoped goal]

Context:
- Codebase: Next.js 15, TS strict; UI via [library]; DB: [Prisma/Supabase]
- Related files:
  - app/[route]/page.tsx — [purpose]
  - lib/api.ts — [endpoints]
  - UX_UI.md — component patterns
  - client/SPEC_TZ.md — acceptance and business constraints
- Constraints:
  - TS: no any, explicit returns
  - Zod validation for inputs
  - A11y: keyboard, focus, contrast
  - Perf: avoid blocking main thread; lazy-load heavy parts
- API/schema contracts:
  - POST /api/notes — input/output
- Acceptance:
  - Unit tests for [function]
  - Lighthouse P75 LCP < 2.5s
  - a11y: axe: no serious/critical

Deliverables:
- Edits in files (exact paths). Keep existing style/format.
- New components follow naming and folder structure.
```

## Do / Don’t
- Do: cite files and lines when asking for changes; provide examples.
- Do: prefer incremental edits; keep functions < 50 LOC; early returns.
- Don’t: ask for entire feature without context; don’t omit tests.

## Linking Context
- Use repository-relative paths (`app/...`, `lib/...`).
- Reference docs: `UX_UI.md`, `DEV_RULES.md`, `VERSIONING.md`, `client/SPEC_TZ.md`.
- Include external spec/design links when relevant.

## Review Checklist (AI Output)
- Types correct; no `any`.
- Inputs validated with Zod.
- A11y and UX patterns respected.
- Tests included or test plan described.
- No secrets; env via config.

## Examples
- See `TEMPLATES/PR_TEMPLATE.md` for PR framing.
- Use `CHECKLISTS/RELEASE.md` to finalize.

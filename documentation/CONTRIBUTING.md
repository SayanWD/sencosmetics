# Contributing Guide

## Workflow
1) Create branch from `develop`: `feature/*`, `fix/*`, `chore/*`
2) Commit with Conventional Commits
3) Open PR to `develop`
4) Ensure CI passes (lint/type/tests)
5) Request review and address comments

## Commit Messages (Conventional)
- feat: new feature
- fix: bug fix
- refactor: code changes without behavior change
- perf: performance improvement
- docs, chore, test, ci, build
- BREAKING CHANGE: in body or `!` in type

## Code Quality
- TypeScript strict, no `any`
- Zod for runtime validation
- One responsibility per function (<= 50 lines when possible)
- Prefer early returns

## Tests
- Unit for business logic
- Integration for API/DB
- E2E for critical flows

## UX & A11y
- Follow `UX_UI.md`
- Provide loading/error/empty states
- Validate keyboard navigation and contrast

## AI-Assisted Changes
- Follow `AI_CODING.md`
- Include PR context: files, constraints, references, acceptance criteria
- Reference client requirements from `client/SPEC_TZ.md` when applicable

## Security
- Do not log secrets
- Validate inputs
- Follow ENV management rules

## Releases
- Maintained via semantic-release
- CHANGELOG generated from commits

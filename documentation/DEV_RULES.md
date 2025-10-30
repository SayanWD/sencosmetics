# Development Rules (Universal TS/Next.js)

## TypeScript
- Explicit return types for functions
- No `any` (use `unknown` + parsing)
- Prefer interfaces for object shapes
- Descriptive names, no abbreviations

## Functions
- Single responsibility
- Early returns over nested if
- <= 50 lines where reasonable

## Validation
- Use Zod for inputs and env
- Centralize schemas and reuse across layers

## Git
- Conventional Commits required
- Branches: feature/*, fix/* → PR to main
- No direct commits to main; защищённые бранчи и обязательные проверки

## Testing
- Unit > Integration > E2E (pyramid)
- Group with describe, setup/teardown
- Focus on critical paths

## UX/UI
- Follow UX_UI.md for a11y, responsiveness, content, performance

## AI Assistance
- Follow AI_CODING.md: provide context, constraints, references, acceptance

## Docs
- Document public APIs and complex logic
- Keep changelog via semantic-release
 - Сверяться с `documentation/client/SPEC_TZ.md` для acceptance и ограничений

## Security
- Never log secrets
- Validate all external inputs
- RLS in DB when applicable (Supabase)

## Performance
- Avoid N+1, paginate
- Analyze bundles and measure

See also: `CI_CD.md`, `VERSIONING.md`.

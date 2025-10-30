# FAQ (Universal)

## How do I deploy to production?
- Merge to `main` and let CI run release/deploy pipeline. See DEPLOYMENT.md.

## How are versions managed?
- SemVer + semantic-release from commit history. See VERSIONING.md.

## Where do I put environment variables?
- In Vercel project settings and `.env.local` for local dev. Validate with Zod.

## Do I need Supabase?
- Recommended for auth/DB. For static landing pages, you can omit DB entirely.

## How to add a new feature?
- Branch `feature/*`, commit with Conventional Commits, open PR to `main`.

## What are project phases?
- Phase 1: Landing Page MVP (content, SEO, analytics, lead forms, i18n KZ/RU)
- Phase 2: Catalog and PDP
- Phase 3: Cart and simplified checkout

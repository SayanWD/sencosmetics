# UX/UI Best Practices (Universal)

## Foundations
- Design tokens: colors, spacing, typography, radii. Centralize and reuse.
- Responsive by default (mobile-first). Test breakpoints (sm/md/lg/xl).
- Accessibility (a11y): semantic HTML, ARIA where needed, focus states, contrast ≥ 4.5:1.
- Internationalization: обязательна. Без хардкода строк; все тексты через i18n‑ключи, плейсхолдеры и числа/даты/валюты форматируются по локали. Поддержка RTL при необходимости.
- Dark/Light themes supported; respect prefers-color-scheme.

## Interaction
- Meaningful loading states: skeletons/spinners; optimistic UI when safe.
- Error handling: inline, actionable messages; never leak tech details; retries where appropriate.
- Empty states: guide user to first success (CTAs, examples).
- Forms: labels tied to inputs, validation messages near fields, keyboard navigation.
- Buttons: primary/secondary/tertiary; disabled vs. loading states distinct.

## Content & Structure
- Clear hierarchy: H1 → H2 → H3; single H1 per page.
- Copy: concise, action-oriented; avoid jargon; use i18n keys.
- Links vs. buttons: navigation is link, actions are buttons.
- Lists and tables: pagination/virtualization for large sets; sticky headers when needed.

## Performance
- Image optimization: responsive images, lazy loading, proper formats (WebP/AVIF).
- Code-splitting and dynamic imports for heavy components.
- Avoid layout shift (CLS): reserve space, use skeletons.
- Measure: Lighthouse, Web Vitals; budget thresholds in CI (P75 CLS < 0.1, LCP < 2.5s).

## Components
- Prefer a component library (shadcn/ui or similar) with accessible primitives.
- Reuse patterns: modal/dialog, toast/notification, dropdown, tooltip.
- State: avoid prop drilling; use context or state libs only as needed.

## SEO & Analytics
- Meta tags, OpenGraph, canonical URLs per page.
- Structured data where relevant.
- Opt-in analytics; respect privacy (no PII). Consent banner if required.

## QA & Checks
- A11y: axe/lighthouse clean, keyboard-only navigation works.
- Visual: cross-browser/device, dark/light themes.
- i18n: fallback present; long-string overflow handled.

## References
- WAI-ARIA Authoring Practices
- Material/Apple HIG for interaction patterns
- Lighthouse/Axe for audits

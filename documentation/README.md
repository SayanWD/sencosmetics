# Sencosmetics — Project Documentation

Комплект документов для проекта Sencosmetics (Next.js + TypeScript + Supabase, деплой на Vercel). Используйте как источник истины по архитектуре, правилам разработки, деплою и клиентской спецификации.

## Состав
- ARCHITECTURE.md — архитектура, принципы, слои и паттерны
- SETUP.md — локальная настройка, окружения, переменные, миграции
- DEPLOYMENT.md — деплой на Vercel, домены, Supabase, чек-листы
- VERSIONING.md — SemVer, ветки, теги, релизы, Conventional Commits
- DEV_RULES.md — стандарты кода и практики для TypeScript/Next.js
- UX_UI.md — UX/UI лучшие практики, a11y, производительность
- AI_CODING.md — гайд по работе с ИИ для генерации кода
- CI_CD.md — GitHub Actions, semantic-release, пайплайны
- CONTRIBUTING.md — как вносить изменения, PR/ревью правила
- TEMPLATES/ — шаблоны (CHANGELOG, Release Notes, Issue, PR)
- CHECKLISTS/ — чек-листы (release, deployment)
- client/ — информация о проекте клиента и спецификация с ТЗ
- FAQ.md — ответы на частые вопросы

## Cursor Rules
- Проектные правила для Cursor: `.cursor/rules/` (`project.mdc`, `ai-context.mdc`)
- Учитывать `client/` спецификацию при генерации кода (см. быстрые ссылки ниже)

## Как пользоваться
- Опираться на документы этого каталога при выполнении задач
- Сверяться с клиентской спецификацией: цели, acceptance, ограничения
- Поддерживать актуальность ссылок между документами

## Быстрые ссылки
- Клиент: `documentation/client/PROJECT_OVERVIEW.md`, `documentation/client/SPEC_TZ.md`, `documentation/client/README.md`
- Архитектура/правила: `ARCHITECTURE.md`, `DEV_RULES.md`, `UX_UI.md`, `AI_CODING.md`
- Процессы: `CI_CD.md`, `DEPLOYMENT.md`, `VERSIONING.md`, `CHECKLISTS/`

## Этапы проекта (Roadmap)
- Этап 1: Landing Page MVP (контент, SEO, аналитика, лид‑формы, i18n KZ/RU)
- Этап 2: Каталог и PDP
- Этап 3: Корзина и упрощённый checkout

---

Последнее обновление: 2025‑10‑30

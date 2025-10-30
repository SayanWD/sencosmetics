# Architecture Guide (Universal)

Цель: дать основу архитектуры для приложений (Next.js/TypeScript), корпоративных сайтов и лендингов.

## Принципы
- Вертикальная нарезка (Vertical Slicing)
- SSR/SSG + Client Components там, где нужна интерактивность
- Явная типизация и валидация (TypeScript + Zod)
- Минимум сайд-эффектов, чистые функции, ранние возвраты

## Слои
- Presentation (UI): компоненты, страницы, маршруты
- Application: состояния, хэндлеры, серверные действия
- Domain: бизнес‑логика, сервисы, правила
- Data: клиенты БД/внешних сервисов (Prisma/Supabase), модели

## Потоки
```text
User -> UI -> Server Action/API -> Domain Service -> DB/External -> Response
```

## Папки (рекомендация)
```
src/
  app/           # Next.js App Router (routes, layouts)
  components/    # UI компоненты
  lib/           # клиенты, утилиты
  actions/       # server actions / API-обёртки
  styles/        # стили
  (db|supabase)/ # Prisma/Supabase клиенты и схемы
  locales/       # i18n словари (kz, ru)
```

## Безопасность
- Валидация входа (Zod)
- Не логировать секреты
- ENV через валидируемый слой (zod-config)
- RLS в БД (Supabase)

## Производительность
- Пагинация/ленивая загрузка
- Кэширование где уместно
- Lighthouse/Web Vitals в CI

## Масштабирование
- Stateless UI/Server Actions
- CDN (Vercel) + Edge где нужно
- Индексация и пул коннекций к БД

## Клиентские требования
- Архитектурные решения должны соответствовать `client/SPEC_TZ.md` и `client/PROJECT_OVERVIEW.md`

## i18n
- Маршрутизация: Next.js App Router с интернационализированными маршрутами (`/kz`, `/ru`) и middleware для выбора локали
- Хранение строк: `locales/{kz,ru}/**/*.json`, неймспейсы по страницам/фичам
- Форматирование по локали: даты/валюты через Intl API на сервере и клиенте
- SEO: локализованные метаданные, `hreflang`, каноникал, schema.org с языковыми вариантами

## Ссылки
- См. также: `UX_UI.md` для UI/UX принципов
- Деплой: `DEPLOYMENT.md`

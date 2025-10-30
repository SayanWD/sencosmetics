# Setup Guide (Sencosmetics)

## Требования
- Node.js 18+
- npm
- Git
- (Опционально) Supabase аккаунт

## Шаги
1) Клонировать репозиторий
```bash
git clone <repo-url>
cd <project>
```

2) Установить зависимости
```bash
npm ci
```

3) Переменные окружения
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GTM_ID=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# i18n
NEXT_PUBLIC_DEFAULT_LOCALE=ru
NEXT_PUBLIC_SUPPORTED_LOCALES=kz,ru
```

4) Миграции/SQL (если применимо)
- Примените SQL из каталога `supabase/` через Supabase SQL Editor

5) Запуск
```bash
npm run dev
```

## Отладка
- DEBUG=* npm run dev

## Ссылки
- См. также: `DEPLOYMENT.md` для production настройки
- Деплой: `DEPLOYMENT.md`

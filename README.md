# Sencosmetics

Next.js приложение для косметического бренда с интеграцией Supabase, аналитикой и формами обратной связи.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

## 📁 Структура проекта

```
├── app/                    # Next.js App Router
│   ├── api/               # API маршруты
│   ├── components/        # React компоненты
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Главная страница
├── lib/                   # Утилиты и конфигурация
│   ├── supabase/         # Supabase клиенты
│   ├── fetcher.ts        # HTTP клиент
│   └── utils.ts          # Общие утилиты
├── stores/               # Zustand стейт менеджмент
├── public/               # Статические файлы
├── supabase/             # SQL схемы и миграции
├── __tests__/            # Unit тесты
├── e2e/                  # E2E тесты (Playwright)
└── documentation/        # Проектная документация
```

## 🛠 Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Supabase** - база данных и аутентификация
- **Zustand** - стейт менеджмент
- **React Hook Form + Zod** - формы и валидация
- **Jest + Testing Library** - unit тесты
- **Playwright** - E2E тесты

## 🧪 Тестирование

```bash
# Unit тесты
npm test

# E2E тесты
npm run test:e2e

# Все тесты
npm run test:all

# Линтинг
npm run lint

# Проверка типов
npm run type-check
```

## 🔧 Конфигурация

### Переменные окружения

Скопируйте `ENV_TEMPLATE.txt` в `.env.local` и заполните:

```bash
cp ENV_TEMPLATE.txt .env.local
```

Обязательные переменные:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GTM_ID`

### Supabase

1. Создайте проект в [Supabase](https://supabase.com)
2. Выполните SQL из `supabase/schema.sql`
3. Настройте RLS политики
4. Обновите переменные окружения

## 📚 Документация

Подробная документация находится в папке `documentation/`:

- `documentation/client/SPEC_TZ.md` - техническое задание
- `documentation/UX_UI.md` - UX/UI гайдлайны
- `documentation/DEV_RULES.md` - правила разработки
- `documentation/AI_CODING.md` - гайд для ИИ-ассистента

## 🚀 Деплой

Проект готов для деплоя на Vercel:

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

## 📋 Скрипты

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка проекта
- `npm run start` - запуск продакшен сервера
- `npm run lint` - проверка кода
- `npm run type-check` - проверка типов
- `npm test` - unit тесты
- `npm run test:e2e` - E2E тесты
- `npm run test:all` - все тесты

## 🤝 Разработка

1. Создайте feature ветку: `git checkout -b feature/your-feature`
2. Внесите изменения
3. Запустите тесты: `npm run test:all`
4. Создайте PR в `main`

## 📄 Лицензия

Private project - все права защищены.


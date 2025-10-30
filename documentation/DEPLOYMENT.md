# Deployment Guide (Vercel + Supabase)

## Кратко
- Хостинг: Vercel (Preview/Production)
- Домен: управляется в Vercel
- БД/Auth: Supabase (PostgreSQL)

## Vercel
1) Импорт репозитория → New Project
2) ENV (Settings → Environment Variables):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_GTM_ID
   - SUPABASE_SERVICE_ROLE_KEY (prod, только на сервере)
3) Build: `npm run build`, Install: `npm ci`, Output: `.next`
4) Preview: автодеплой для PR/веток, Production: из `main` или по тегу

## Домен
- Project → Domains → Add
- Если домен у Vercel — просто прикрепить
- Если у другого регистратора — NS или A/CNAME согласно инструкции Vercel

## Supabase
- Создать проект, получить ключи
- Включить RLS, добавить политики
 - Применить SQL из каталога `supabase/` (если предусмотрены), проверить схемы

## Чек-лист перед релизом
- [ ] Lint/Type/Tests — зелёные
- [ ] Миграции проверены
- [ ] ENV актуальны
- [ ] Домены/SSL ок
- [ ] CHANGELOG обновлён
- [ ] Версия/теги корректны

## Откат
- Redeploy предыдущего билда в Vercel
- Обратные миграции/горячий фикс

## Ссылки
- См. также: `VERSIONING.md` для релизного процесса
- Версионирование: `VERSIONING.md`

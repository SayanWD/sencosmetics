# Versioning & Releases (Universal)

## SemVer
- Формат: vMAJOR.MINOR.PATCH
- MAJOR — breaking changes, MINOR — функциональность, PATCH — багфиксы
- Pre-release: `-alpha.N`, `-beta.N`, `-rc.N`

## Ветвление
- main — production
- feature/*, fix/* — ветки разработки → PR в main
- hotfix/* — срочные фиксы от main → PR в main

## Теги и подпись
- Теги только на `main`: `vX.Y.Z`
- По возможности `git tag -s` (GPG)

## CHANGELOG и релиз-ноты
- Формат: Keep a Changelog
- Шаблоны: `TEMPLATES/CHANGELOG.md`, `TEMPLATES/RELEASE_NOTES.md`

## Conventional Commits
- feat, fix, perf, refactor, docs, chore, test, ci, build
- BREAKING CHANGE: в теле коммита или префикс `!`
- Примеры:
```
feat(auth): add passwordless login
fix(api): handle null price on cart summary
feat!: remove deprecated v1 endpoints
```

## Автоматизация (semantic-release)
- Определяет bump по коммитам
- Публикует теги/релизы, обновляет CHANGELOG
- Пример workflow см. `CI_CD.md`

## Ссылки
- См. также: `CI_CD.md` для автоматизации

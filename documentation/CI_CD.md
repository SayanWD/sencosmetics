# CI/CD Guide

## Goals
- Fast feedback: lint, typecheck, tests on PR
- Automated releases: semantic-release
- Safe deploy pipeline

## GitHub Actions: Quality
```yaml
name: CI
on:
  pull_request:
    branches: [ main ]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test --if-present
```

## GitHub Actions: Release (semantic-release)
```yaml
name: Release
on:
  push:
    branches: [ main ]
jobs:
  semantic-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build --if-present
      - name: Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

## semantic-release (package.json excerpt)
```json
{
  "release": {
    "branches": [
      "main"
    ],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
      ["@semantic-release/git", { "assets": ["CHANGELOG.md", "package.json"] }],
      "@semantic-release/github"
    ]
  }
}
```

## Notes
- Enforce Conventional Commits on PR review
- Protect `main` with required checks
- Deploy to production only from `main` (tagged releases)

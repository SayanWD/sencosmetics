# Deployment Checklist

Pre-Deployment
- [ ] ENV present in target environment
- [ ] DB migrations safe to run (deploy)
- [ ] Domain/DNS/SSL ready (Vercel)
- [ ] Lighthouse/Web Vitals within budget
- [ ] Axe a11y checks clean (no serious/critical)

Deployment
- [ ] Build succeeds (CI)
- [ ] Prisma migrate deploy executed (if applicable)
- [ ] Health checks pass

Post-Deployment
- [ ] Smoke tests on key paths
- [ ] Monitoring/logs clean
- [ ] Rollback instructions confirmed

---
description: CI/CD Pipeline Best Practices and GitHub Actions Automation Standards
applyTo: '**'
---

# CI/CD Instructions

## Pipeline Design Principles

### Core Standards
- **Fast feedback**: Tests should complete in < 10 minutes
- **Fail fast**: Stop pipeline on first critical failure
- **Idempotent**: Same input should always produce same output
- **Observable**: Log all steps for debugging
- **Secure**: Never expose secrets in logs

## GitHub Actions Workflow Standards

### Trigger Events
- `push`: Code pushed to branch
- `pull_request`: PR created or updated
- `schedule`: Scheduled runs (nightly builds, security scans)
- `workflow_dispatch`: Manual trigger for special cases

### Branch Protection Rules
- Require passing checks before merge
- Require PR review before merge
- Dismiss stale PR approvals on new changes
- Require status checks to pass

## Build Pipeline

### Build Stage (First Line)
1. Checkout code
2. Setup environment (Node, Python, etc.)
3. Install dependencies
4. Compile/build source code
5. Cache build artifacts

### Failure Handling
- Fail immediately on build errors
- Report build failure clearly
- Block PR merge on build failure
- Store build logs for debugging

### Build Optimization
- Cache dependencies (npm, pip, maven)
- Cache build artifacts
- Use matrix builds for multiple versions
- Parallelize builds when possible

## Testing Pipeline

### Test Stages (In Order)
1. **Unit Tests**: Fast, isolated, no external deps
2. **Integration Tests**: Multiple components, may use test DBs
3. **E2E Tests**: Full system, real workflows
4. **Performance Tests**: Load testing, benchmarks
5. **Security Tests**: Static analysis, dependency scan

### Test Requirements
- Minimum 80% code coverage (configurable)
- All tests must pass before merge
- Tests should complete in < 5 minutes
- Failed tests must show clear error messages

### Test Data & Cleanup
- Use temporary/test databases
- Clean up test data after tests
- Don't use production data in tests
- Isolate tests (no cross-contamination)

## Code Quality Checks

### Static Analysis
- Lint code (ESLint, Pylint, etc.)
- Format check (Prettier, Black, etc.)
- Type checking (TypeScript, mypy, etc.)
- Security scanning (SAST tools)

### Quality Gates
- No errors (only warnings acceptable)
- Code coverage above threshold
- No critical security issues
- Performance benchmarks met

### Reporting
- Generate coverage reports
- Post results to PR
- Fail build if gates not met
- Store reports for trend analysis

## Security Scanning

### Dependency Scanning (Every Commit)
- Scan for vulnerable packages
- Check outdated dependencies
- Fail on critical vulnerabilities
- Auto-update for minor versions

### Code Scanning (Every Push)
- Static security analysis
- Secret scanning (API keys, tokens)
- License compliance check
- OWASP top 10 coverage

### Secrets Detection
- Scan for exposed credentials
- Fail on secrets found
- Rotate compromised secrets
- Educate team on secret handling

## Deployment Pipeline

### Deployment Stages
1. **Staging**: Test in production-like environment
2. **Approval**: Manual review before production
3. **Production**: Deploy to live environment
4. **Verification**: Smoke tests in production
5. **Rollback**: Automatic rollback on critical failures

### Pre-Deployment Checks
- All tests passing
- Code review approved
- Security scans passed
- Performance acceptable
- Documentation updated

### Production Deployment
- Blue-green deployment when possible
- Gradual rollout for safety
- Health checks post-deployment
- Rollback plan ready
- Monitoring active

## Artifact Management

### Build Artifacts
- Store in artifact repository
- Version all artifacts
- Clean up old artifacts
- Track lineage (what built from what)

### Release Artifacts
- Tag releases in git
- Create release notes
- Build release packages
- Sign artifacts for security

## Monitoring & Alerts

### Pipeline Health Metrics
- Build success rate
- Average build time
- Test pass rate
- Deploy frequency
- Mean time to recovery

### Failure Alerts
- Slack/email on build failure
- On critical test failure
- On security scan failure
- On deployment failure
- Escalate if not resolved quickly

### Performance Tracking
- Build time trends
- Test execution time
- Pipeline stage duration
- Artifact size tracking

## Log Management

### Log Standards
- Clear, structured log messages
- Include timestamp and severity
- Log important decisions and actions
- No sensitive data in logs

### Log Retention
- Keep logs for 90 days minimum
- Archive long-term logs
- Index logs for searchability
- Make logs available to team

## Rollback Procedures

### Automatic Rollback Triggers
- Critical production error (5xx errors spike)
- Deployment failure
- Health check failure
- Performance degradation

### Manual Rollback
- Keep previous version available
- Document rollback procedure
- Test rollback in staging
- Communicate rollback to team

### Post-Rollback
- Investigate root cause
- Fix issue
- Test thoroughly
- Deploy fixed version
- Post-mortem if critical

## Configuration Management

### Environment Variables
- Use secrets manager for sensitive data
- Never commit secrets to repo
- Rotate secrets regularly
- Document required variables

### Configuration Strategy
- Different config per environment
- Load config from environment
- Validate config on startup
- Fail fast on invalid config

## Documentation Requirements

### Workflow Documentation
- Document why each step exists
- Include troubleshooting guide
- Document manual intervention steps
- Keep docs up-to-date

### Runbook Creation
- How to manually run workflow
- How to debug failures
- Common issues and solutions
- Escalation procedures

## Error Handling in Pipelines

### Graceful Failures
- Fail fast, fail clearly
- Provide actionable error messages
- Include suggestions for fixes
- Log full context for debugging

### Retry Logic
- Retry transient failures (network)
- Don't retry permanent failures (syntax)
- Set reasonable retry limits
- Add exponential backoff

### Notifications
- Notify on critical failures
- Include relevant logs
- Suggest next steps
- Track response time

## Performance Optimization

### Parallel Execution
- Run independent tests in parallel
- Use matrix strategies for multiple versions
- Parallelize linters and analyzers
- Combine complementary tools

### Caching Strategy
- Cache dependencies (npm, pip)
- Cache build outputs
- Cache tool installations
- Invalidate cache when needed

### Build Time Targets
- Fast feedback loop (< 10 min)
- Tests complete quickly (< 5 min)
- Quick security scans (< 2 min)
- Full pipeline < 15 minutes

## Compliance & Auditing

### Audit Trail
- Log all deployments
- Track who approved what
- Record configuration changes
- Keep deployment history

### Compliance Checks
- Ensure security requirements met
- Verify code review occurred
- Confirm tests ran
- Document approvals

## Best Practices Checklist

### Before Merging PR
- [ ] All checks passing
- [ ] Code review approved
- [ ] Tests passing (80%+ coverage)
- [ ] Security scan passed
- [ ] No secrets exposed
- [ ] Documentation updated

### Before Production Deploy
- [ ] Staging tests passed
- [ ] Performance acceptable
- [ ] Security review completed
- [ ] Rollback plan ready
- [ ] Team notified
- [ ] Monitoring ready

### After Deployment
- [ ] Health checks passing
- [ ] Error rates normal
- [ ] Performance normal
- [ ] User feedback collected
- [ ] Logs being captured

## Troubleshooting Pipelines

### Common Issues
- **Tests timeout**: Increase timeout or optimize tests
- **Flaky tests**: Isolate, fix randomness, retry
- **Cache stale**: Clear cache, update invalidation
- **Rate limits**: Batch requests, add delays
- **Network issues**: Retry with backoff

### Debug Techniques
- Run workflow locally (act)
- Re-run failed jobs with debug logging
- Check artifact uploads
- Review environment variables
- Verify permissions

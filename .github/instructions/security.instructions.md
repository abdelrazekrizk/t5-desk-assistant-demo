---
description: Security Best Practices and Protection Standards
applyTo: '**'
---

# Security Instructions

## Security Principles

### Core Security Concepts
- **Defense in Depth**: Multiple layers of security
- **Least Privilege**: Minimal required permissions
- **Fail Securely**: Secure defaults, explicit allow
- **Secure by Design**: Security from start, not afterthought
- **Trust Nothing**: Validate everything

### Security Mindset
- Assume threats exist
- Validate all inputs
- Protect sensitive data
- Log security events
- Regular audits

## Secrets Management

### Secret Types (Never in Code)
- API keys and tokens
- Database credentials
- Private keys
- OAuth tokens
- SSH keys
- Encryption keys

### Where to Store Secrets
```
✅ GOOD:
- GitHub Secrets (environment variables)
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- Encrypted .env files (locally only)

❌ BAD:
- Hardcoded in source code
- Committed to git repository
- Exposed in logs
- Stored in unencrypted files
- Passed as command line args
```

### Secret Rotation
- Rotate secrets every 90 days
- Rotate compromised secrets immediately
- Automated rotation where possible
- Track rotation history

### Accessing Secrets in CI/CD
```yaml
# Correct: Use GitHub Secrets
- name: Deploy
  env:
    DATABASE_PASSWORD: ${{ secrets.DB_PASSWORD }}
    API_KEY: ${{ secrets.API_KEY }}

# Incorrect: Hardcoded secrets
- name: Deploy
  env:
    DATABASE_PASSWORD: "password123"
```

## Authentication & Authorization

### Authentication Standards
- Enforce strong passwords (12+ chars, mixed case, numbers, symbols)
- Multi-factor authentication (MFA) required
- OAuth2/OpenID Connect for third-party apps
- Never store plain text passwords
- Use bcrypt/Argon2 for hashing

### Authorization Standards
- Role-based access control (RBAC)
- Grant least privilege
- Separate development, staging, production access
- Audit permission changes
- Revoke access immediately when needed

### Session Management
- Use secure session tokens
- Set appropriate timeout periods
- Invalidate sessions on logout
- Use HttpOnly, Secure, SameSite cookies
- Prevent session fixation

## Input Validation

### Validation Principles
- Never trust user input
- Whitelist acceptable values
- Validate type, length, format
- Reject suspicious patterns
- Log validation failures

### Common Attack Vectors
```
Input: "><script>alert('xss')</script>
Risk: Cross-site scripting (XSS)
Fix: Sanitize/escape HTML

Input: ' OR '1'='1
Risk: SQL injection
Fix: Use parameterized queries

Input: ../../../etc/passwd
Risk: Path traversal
Fix: Use absolute paths, validate input
```

### Input Validation Strategy
```
1. Identify input sources (URL, form, API, file)
2. Define valid formats
3. Validate type (string, number, etc.)
4. Validate length (max/min)
5. Validate format (regex pattern)
6. Whitelist acceptable values
7. Reject anything else
8. Log suspicious attempts
```

## Data Protection

### Data Classification
- **Public**: No restrictions
- **Internal**: Employees only
- **Confidential**: Limited need-to-know
- **Restricted**: Highest security

### Encryption Standards
- **In Transit**: TLS 1.3 minimum
- **At Rest**: AES-256 for sensitive data
- **In Memory**: Protect key material
- **Key Management**: Secure key generation and storage

### Data Minimization
- Collect only necessary data
- Delete data when no longer needed
- Anonymize where possible
- Limit data access

### Personally Identifiable Information (PII)
- Encrypt PII at rest and in transit
- Limit who can access PII
- Audit PII access
- Comply with data protection laws (GDPR, CCPA)

## Code Security

### Secure Coding Practices
- No hardcoded secrets
- Use parameterized queries
- Escape output for context
- Validate and sanitize inputs
- Use security libraries
- Keep dependencies updated

### Common Vulnerabilities (OWASP Top 10)
1. **Broken Access Control**: Enforce proper authorization
2. **Cryptographic Failures**: Use strong encryption
3. **Injection**: Parameterized queries, input validation
4. **Insecure Design**: Security in design, threat modeling
5. **Security Misconfiguration**: Secure defaults, harden
6. **Vulnerable Components**: Update dependencies
7. **Authentication Failures**: Strong auth, MFA
8. **Data Integrity Failures**: Validation, checksums
9. **Logging Failures**: Comprehensive logging
10. **SSRF**: Input validation, network segmentation

### Code Review Checklist
- [ ] No secrets in code
- [ ] Input validation present
- [ ] Output escaping correct
- [ ] Authentication enforced
- [ ] Authorization checked
- [ ] Error handling secure
- [ ] Logging appropriate
- [ ] Dependencies current
- [ ] Security headers set

## Dependency Management

### Dependency Scanning
- Scan on every commit
- Identify vulnerable packages
- Check license compliance
- Audit security advisories

### Updating Dependencies
- Regular updates (monthly minimum)
- Test updates in staging
- Automate minor version updates
- Manual review major versions
- Keep framework versions current

### Vulnerable Dependencies
```
Critical: Fix immediately (24 hours)
High: Fix within 1 week
Medium: Fix within 2 weeks
Low: Fix within 30 days
```

### Tools for Scanning
- npm audit / npm audit fix
- Snyk
- OWASP Dependency Check
- Black Duck
- Trivy

## Security Testing

### Static Application Security Testing (SAST)
- Scan code for vulnerabilities
- Detect hardcoded secrets
- Find common patterns
- Enforce secure coding

### Dynamic Application Security Testing (DAST)
- Test running application
- Scan for vulnerabilities
- Fuzzing and stress testing
- Runtime protection

### Dependency Testing
- Scan for known vulnerabilities
- Check library reputation
- Verify license compliance
- Monitor security advisories

### Penetration Testing
- Annual external penetration test
- Red team exercises
- Vulnerability assessment
- Remediation verification

## Logging & Monitoring

### Security Logging
- Log authentication attempts (success and failure)
- Log authorization decisions
- Log data access and changes
- Log security events
- Do NOT log sensitive data

### Log Security
- Store logs securely
- Encrypt sensitive logs
- Retain logs (90 days minimum)
- Monitor for suspicious patterns
- Alert on security events

### Monitoring Alerts
- Multiple failed login attempts
- Unusual data access patterns
- Privilege escalation attempts
- Configuration changes
- Security tool failures

## Incident Response

### Incident Response Plan
1. **Detect**: Monitor and alerts
2. **Respond**: Contain threat, notify team
3. **Investigate**: Root cause analysis
4. **Remediate**: Fix vulnerability
5. **Recover**: Restore normal operations
6. **Review**: Post-mortem, lessons learned

### Breach Response Procedures
- Isolate affected systems
- Assess scope of breach
- Notify relevant parties
- Legal/compliance involvement
- Public communication if needed
- Implement remediation
- Improve controls

### Communication
- Coordinate with security team
- Communicate timeline to stakeholders
- Public notice if data exposed
- Follow regulatory requirements
- Transparent communication

## Network Security

### Network Segmentation
- Separate development, staging, production
- Restrict network access
- Use VPN for remote access
- Firewall rules enforced
- Regular network audits

### API Security
- HTTPS/TLS required
- API authentication (API keys, OAuth)
- Rate limiting
- Input validation
- Error handling (don't expose internals)
- CORS policies set correctly

### Infrastructure Security
- Keep systems patched
- Harden server configurations
- Disable unnecessary services
- Use security groups/firewalls
- Monitor for intrusions
- Regular security audits

## Deployment Security

### Pre-Deployment
- Security review completed
- Tests passing
- No secrets in code
- Dependencies scanned
- Deployment plan reviewed

### Deployment Process
- Authorized personnel only
- Audit trail recorded
- Rollback plan ready
- Monitoring active
- Incident response ready

### Post-Deployment
- Verify security controls active
- Monitor for anomalies
- Check logs for issues
- Validate security headers
- Performance acceptable

## Container Security

### Container Image Security
- Scan for vulnerabilities
- Use minimal base images
- Keep images updated
- Sign images
- Store privately

### Container Runtime
- Run as non-root user
- Read-only file system where possible
- Limit capabilities
- Network policies enforced
- Resource limits set

## Compliance & Standards

### Compliance Requirements
- OWASP Top 10 compliance
- NIST guidelines adherence
- GDPR/CCPA for data protection
- Industry-specific regulations
- Annual security training

### Audit Requirements
- Regular security audits
- Penetration testing
- Vulnerability assessments
- Code review processes
- Access control reviews

## Security Checklist

### Development
- [ ] No secrets in code
- [ ] Input validation implemented
- [ ] Output escaping correct
- [ ] Error handling secure
- [ ] HTTPS/TLS used
- [ ] Dependencies scanned
- [ ] Security headers set

### Before Deployment
- [ ] Security review passed
- [ ] All tests passing
- [ ] Vulnerability scan clear
- [ ] Secrets secured
- [ ] Access controls set
- [ ] Monitoring configured
- [ ] Incident response ready

### Post-Deployment
- [ ] Security controls active
- [ ] Monitoring operational
- [ ] No suspicious activity
- [ ] Performance normal
- [ ] Access logs clean

## Security Resources

### Security Training
- OWASP Top 10 course
- Secure coding practices
- Security testing techniques
- Incident response procedures
- Annual refresher training

### Tools & Services
- SonarQube: Code quality/security
- Snyk: Dependency scanning
- Trivy: Container scanning
- OWASP ZAP: Dynamic testing
- Burp Suite: Penetration testing

## Incident Response Contacts

Keep these documented:
- Security team lead
- Incident commander
- Legal contact
- Communication lead
- Executive sponsor
- Customer support lead

## Continuous Security

### Regular Activities
- Weekly: Monitor alerts
- Monthly: Review logs
- Quarterly: Security audit
- Annually: Penetration test
- Always: Stay informed on threats

### Security Updates
- Subscribe to security advisories
- Monitor CVE databases
- Update threat models
- Review security news
- Learn from incidents (internal and external)

---
description: Testing Best Practices and Quality Assurance Standards
applyTo: '**'
---

# Testing Instructions

## Testing Strategy

### Testing Pyramid (Preferred Distribution)
```
        /\
       /E2E\        5%  - End-to-end, slow, real system
      /------\
     / Integration\ 15% - Multiple components, test DBs
    /----------\
   / Unit Tests \   80% - Fast, isolated, mocked dependencies
  /____________\
```

### Test Coverage Goals
- **Minimum**: 80% code coverage
- **Target**: 85% for core functionality
- **Critical paths**: 100% coverage
- **UI/Integration**: 70% minimum

## Unit Testing

### Unit Test Standards
- **Speed**: < 100ms per test (100+ tests in < 10s)
- **Isolation**: No external dependencies (DB, API, file system)
- **Clarity**: Test name describes what is tested
- **Independence**: Tests pass in any order

### Unit Test Structure
```
describe('Component/Function name', () => {
  beforeEach(() => {
    // Setup shared test data
  });

  it('should [expected behavior] when [condition]', () => {
    // Arrange: Setup test data
    // Act: Call function/method
    // Assert: Verify result
  });

  afterEach(() => {
    // Cleanup
  });
});
```

### Mocking & Stubbing
- Mock external dependencies (DB, API, file system)
- Use test doubles for services
- Mock at interface boundaries
- Verify mock calls for integration points

### Test Data Management
- Use fixtures or factories for consistent data
- Keep test data minimal and focused
- Use meaningful names (not test1, test2)
- Clean up after each test

## Integration Testing

### Integration Test Scope
- Test multiple components together
- Use real or in-memory databases
- Mock external APIs/services
- Verify data flow between components

### Integration Test Setup
- Create test database/environment
- Seed with minimal test data
- Clean up between tests
- Use test transactions/rollback

### Integration Test Standards
- **Speed**: 1-5 seconds per test
- **Reliability**: 100% pass rate (no flakiness)
- **Isolation**: Tests independent of each other
- **Clarity**: Clear what workflow is being tested

## End-to-End Testing

### E2E Test Scope
- Test complete user workflows
- Use real/staging environment
- Test from user perspective
- Verify expected outcomes

### E2E Test Coverage
- Happy path scenarios (main workflows)
- Error handling (invalid inputs)
- Edge cases (boundary conditions)
- Performance critical paths

### E2E Test Standards
- **Speed**: 5-30 seconds per test (total < 5 min for all E2E)
- **Reliability**: 95%+ pass rate (investigate flakiness)
- **Maintainability**: Use page objects, avoid brittle selectors
- **Scalability**: Can run tests in parallel

### Page Object Model (for UI tests)
```
// Avoid: brittle tests coupled to DOM
cy.get('.btn-primary').click();

// Prefer: abstraction for maintainability
LoginPage.clickLoginButton();
```

## Test Types

### Functional Testing
- Verify feature works as specified
- Test normal and error paths
- Validate business logic
- Check data accuracy

### Performance Testing
- Load testing: Expected load performance
- Stress testing: Breaking point testing
- Endurance testing: Long-running stability
- Spike testing: Sudden load increases

### Security Testing
- Input validation (XSS, SQL injection)
- Authentication/authorization
- Data protection (encryption, secrets)
- Vulnerability scanning

### Regression Testing
- Re-test previously fixed bugs
- Verify old features still work
- Automated regression test suite
- Run before each release

## Continuous Testing

### Automated Testing
- Run tests on every commit
- Fast feedback loop (< 10 min)
- Fail build on test failure
- Fail build on coverage drop

### Manual Testing Checklist
- Exploratory testing before release
- User acceptance testing
- Accessibility testing
- Browser/device compatibility

### Testing Schedule
- **Every Commit**: Unit tests, quick integration tests
- **Every PR**: Full test suite, coverage check
- **Nightly**: E2E tests, performance tests
- **Release**: Full test suite, manual testing

## Test Failures & Debugging

### When Tests Fail
1. Verify it's real failure (not flaky)
2. Understand root cause
3. Fix issue or test
4. Verify fix works
5. Add test case if missing

### Flaky Tests (Unreliable)
- Identify and isolate
- Fix randomness/timing issues
- Add retry logic if appropriate
- Disable temporarily if urgent
- Fix properly before merging

### Debugging Failed Tests
- Re-run locally to reproduce
- Add debug logging
- Use test debugger
- Check error messages
- Review test data setup
- Check mocks/stubs

## Test Data Strategy

### Test Data Principles
- Minimal necessary data
- Repeatable (same data each run)
- Isolated (no cross-test pollution)
- Representative (realistic scenarios)

### Data Generation
- Use factories/builders for objects
- Use fixtures for static data
- Generate unique IDs per test
- Clean up after test

### Database Testing
- Use test database
- Rollback after each test
- Seed initial data
- Verify data state post-test

## Code Coverage

### Coverage Metrics
- **Line Coverage**: % of lines executed
- **Branch Coverage**: % of conditional branches
- **Function Coverage**: % of functions called
- **Statement Coverage**: % of statements executed

### Coverage Goals
- Critical business logic: 100%
- Core functionality: 85%+
- Utilities/helpers: 80%+
- UI Components: 70%+
- Exclude: Generated code, third-party code

### Coverage Tools
- Track coverage in CI pipeline
- Fail on coverage decrease
- Generate coverage reports
- Archive for trend analysis

## Test Organization

### File Structure
```
src/
  utils/
    math.ts
    __tests__/
      math.test.ts
  components/
    Button/
      Button.tsx
      Button.test.tsx
test/
  integration/
    auth.integration.test.ts
  e2e/
    login.e2e.test.ts
```

### Test Naming
- Descriptive: `should_return_sum_when_adding_positive_numbers`
- Not: `test1`, `test_math`, `badTest`
- Include expected vs actual behavior
- Make failure reason clear

### Test Organization
- Group related tests in describe blocks
- One logical test per it() block
- Arrange-Act-Assert pattern
- Avoid multiple assertions when unclear

## Mocking Strategies

### When to Mock
- External APIs (real calls are slow/unstable)
- Databases (isolation, speed)
- File system (isolation)
- Time-dependent code (timers, dates)

### When NOT to Mock
- Core business logic
- Critical workflows
- Data transformation
- Error handling (unless complex)

### Mock Libraries
- Jest for unit testing
- Sinon/Jasmine for spies
- Nock for HTTP mocking
- MSW for API mocking

## Accessibility Testing

### Accessibility Standards
- WCAG 2.1 Level AA minimum
- Keyboard navigation
- Screen reader compatible
- Color contrast requirements

### Automated Checks
- Use axe-core for automated scanning
- Check semantic HTML
- Verify ARIA labels
- Test keyboard navigation

### Manual Testing
- Test with screen reader
- Navigate with keyboard only
- Check color contrast
- Test with accessibility tools

## Performance Testing

### Performance Test Goals
- Load time < 3 seconds
- Time to interactive < 5 seconds
- Core Web Vitals targets
- Zero runtime errors

### Performance Metrics
- Page load time
- Time to First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

### Performance Testing Tools
- Lighthouse
- WebPageTest
- Chrome DevTools
- Artillery (load testing)

## Test Maintenance

### Keeping Tests Healthy
- Review tests during code review
- Update tests when code changes
- Refactor tests (remove duplication)
- Remove obsolete tests
- Archive and retire old tests

### Test Quality Metrics
- Test pass rate (target: 100%)
- Test execution time
- Code coverage
- Defect escape rate (bugs in production)

## Continuous Improvement

### Metrics to Track
- Test coverage trend
- Test execution time trend
- Defects found by tests vs in production
- Test maintenance effort

### Regular Review
- Monthly: Review test metrics
- Quarterly: Audit test quality
- Annually: Assess testing strategy
- After major incident: Update tests

## Testing Checklist

### Before Committing Code
- [ ] All unit tests pass
- [ ] Code coverage maintained or improved
- [ ] No new test failures
- [ ] Integration tests pass
- [ ] No hardcoded test data in code

### Before Merging PR
- [ ] All automated tests passing
- [ ] Coverage above minimum
- [ ] Tests reviewed by peer
- [ ] No flaky tests
- [ ] Performance acceptable

### Before Release
- [ ] Full test suite passing
- [ ] E2E tests passing
- [ ] Performance tests passing
- [ ] Security tests passing
- [ ] Manual testing complete

## Troubleshooting Tests

### Common Test Issues
- **Timeout**: Increase timeout or optimize test
- **Flaky**: Fix timing, add waits, isolate
- **Setup failure**: Verify test data/mocks
- **Assertion failure**: Check logic and data
- **Mock not working**: Verify mock setup

### Debug Techniques
- Add console.log (temporary)
- Use debugger breakpoints
- Run single test in isolation
- Simplify test to minimal case
- Check environment setup

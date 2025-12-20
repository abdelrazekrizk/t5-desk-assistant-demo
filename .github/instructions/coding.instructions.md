---
description: Coding Best Practices and Agent Task Execution Standards
applyTo: '**'
---

# Coding Instructions

## Coding Task Execution Framework

### Problem: Incomplete Implementation

**Issue Identified:**
When agents are assigned coding tasks, they often:
- Create only entry points (main.ts, app.ts)
- Skip core implementation files
- Don't analyze existing code structure
- Fail to identify all required components
- Produce incomplete feature sets

**Root Cause:**
Agents jump directly to code generation without:
1. Understanding project structure
2. Analyzing existing codebase
3. Creating comprehensive implementation plans
4. Breaking work into complete, testable units
5. Grouping changes by file/feature

**Solution:**
Implement mandatory "Plan (step-by-step)" phase before ANY code generation.

## Mandatory Task Analysis Phase

### Step 0: Before Code Generation

When assigned ANY coding task, agents MUST:

#### 0.1 Analyze Project Structure
```
Required Analysis:
1. Directory structure and organization
2. Existing configuration files (package.json, tsconfig.json, etc.)
3. Current implementations (services, controllers, entities)
4. Technology stack and dependencies
5. Database schema (if applicable)
6. API patterns and conventions
7. Error handling patterns
8. Testing patterns and test structure
```

#### 0.2 Read Task Requirements
```
Required Steps:
1. Read all requirement documents
2. Identify functional requirements
3. Identify non-functional requirements (performance, security)
4. Understand success criteria
5. Identify constraints and limitations
6. Review design specifications
7. Identify integration points
8. Understand data models
```

#### 0.3 Identify Existing Code
```
Search For:
1. Similar implementations in project
2. Existing modules/components
3. Configuration patterns
4. Database entities
5. DTO/interface definitions
6. Error handling implementations
7. Middleware/interceptor patterns
8. API endpoint examples
```

#### 0.4 Compare Specs vs Implementation
```
Analysis Steps:
1. List all requirements from specs
2. List all existing implementations
3. Identify coverage gaps
4. Identify missing components
5. Identify missing integrations
6. List new files needed
7. List files to update
8. Identify breaking changes (if any)
```

#### 0.5 Create Comprehensive Implementation Plan
```
Plan Must Include:
1. Title: [Feature/Module Name]
2. Executive Summary (2-3 sentences)
3. Architecture Overview
4. Complete list of files to create
5. Complete list of files to modify
6. Component interactions/dependencies
7. Implementation order/sequence
8. Testing strategy
9. Integration points
10. Success criteria validation
```

### Step 1: Create Implementation Plan (Step-by-Step)

#### 1.1 Plan Format
```markdown
## Implementation Plan: [Feature/Module Name]

### Executive Summary
[2-3 sentences describing what will be implemented]

### Architecture Overview
[Diagram or description of components and their relationships]

### Components to Create

#### Component 1: [Name]
- Purpose: [What it does]
- Dependencies: [What it depends on]
- Key Files: [Files to create]
- Responsibilities: [What it is responsible for]

#### Component 2: [Name]
[Same structure as Component 1]

### Files to Create (in order)

1. **filename.ts** (Priority: HIGH/MEDIUM/LOW)
   - Purpose: [What this file does]
   - Dependencies: [What it depends on]
   - Key responsibilities: [List 3-5 key responsibilities]
   - Integration points: [What it integrates with]
   - Example: [Brief example of usage]

2. **filename.ts** (Priority: HIGH/MEDIUM/LOW)
   [Same structure as above]

### Files to Modify

1. **existing-file.ts**
   - Current implementation: [What it currently does]
   - Required changes: [What needs to change]
   - Breaking changes: [Any breaking changes]
   - Backward compatibility: [How to maintain compatibility]

### Implementation Sequence

```
Phase 1: Foundation (must complete first)
  Step 1.1: Create [file 1]
  Step 1.2: Create [file 2]
  Step 1.3: Create [file 3]

Phase 2: Core Logic (depends on Phase 1)
  Step 2.1: Create [file 4]
  Step 2.2: Create [file 5]
  Step 2.3: Modify [existing file]

Phase 3: Integration (depends on Phase 2)
  Step 3.1: Create [file 6]
  Step 3.2: Update [file 1]
  Step 3.3: Add integration tests

Phase 4: Enhancement (optional, depends on Phase 3)
  Step 4.1: Add caching
  Step 4.2: Add monitoring
```

### Testing Strategy

```
Unit Tests:
- [Component 1] service tests
- [Component 2] service tests
- Utility function tests

Integration Tests:
- Module initialization
- Service-to-service communication
- Database interactions

E2E Tests:
- API endpoint workflows
- Error handling scenarios
```

### Success Criteria

- [ ] All files created with complete implementation
- [ ] No placeholder code (TODOs, "...implementation here")
- [ ] All services/controllers fully functional
- [ ] Database entities and repos defined
- [ ] DTOs and interfaces for type safety
- [ ] Error handling and validation implemented
- [ ] Integration points working
- [ ] Unit tests passing
- [ ] Code reviewed for quality
- [ ] Documentation updated
```

#### 1.2 Plan Review Checkpoint
Before proceeding to code generation:
```
CHECKLIST:
☐ Plan document created and complete
☐ All files to create listed with purpose
☐ All files to modify listed with changes
☐ Implementation sequence is logical
☐ Dependencies are clear
☐ Success criteria defined
☐ User has reviewed and approved plan
☐ No ambiguities remain
```

### Step 2: Code Generation Phase

#### 2.1 Follow the Sequence
```
MUST DO:
1. Create files in planned sequence
2. Create Foundation files first (Phase 1)
3. Never skip to later phases
4. Complete one file before moving to next
5. Verify each file before moving on

MUST NOT DO:
- Create only entry points
- Skip intermediate components
- Create files out of sequence
- Leave placeholder code
- Create incomplete services
```

#### 2.2 Complete Implementation Rules
```
Every Created File MUST:
✅ Have complete implementation (not placeholders)
✅ Have proper imports and exports
✅ Have error handling
✅ Have input validation
✅ Have JSDoc comments for all functions
✅ Have inline comments for complex logic
✅ Follow project conventions
✅ Integrate with existing code
✅ Have no TODO or "...implementation here" comments
✅ Be production-ready
```

#### 2.3 Changes Grouped by File
```
Format your response with clear sections:

### File: filename.ts
**Purpose:** What this file does
**Dependencies:** What it imports/depends on
**Changes:**
- Reason for change
- What was added/modified
- Code block with implementation
- Integration points

[Complete code implementation, not excerpts]

### File: another-file.ts
[Same structure]
```

### Step 3: Verification Phase

#### 3.1 Post-Generation Checklist
```
For Each Component Created:
☐ File exists and is complete
☐ No placeholder code remains
☐ All functions implemented
☐ Error handling present
☐ Input validation present
☐ Type safety (TypeScript types)
☐ Comments present
☐ Imports correct
☐ Exports correct
☐ No syntax errors
☐ Follows naming conventions
☐ Follows project patterns
```

#### 3.2 Integration Verification
```
Check:
☐ All dependencies resolved
☐ All imports working
☐ Module structure complete
☐ Service injection working
☐ Database connection working
☐ API endpoints accessible
☐ No circular dependencies
☐ No missing entity definitions
☐ No missing DTOs
```

#### 3.3 Completeness Verification
```
Compare Against Plan:
☐ All Phase 1 files created ✓
☐ All Phase 2 files created ✓
☐ All Phase 3 files created ✓
☐ All modifications applied ✓
☐ All integration points connected ✓
☐ Success criteria met ✓
```

## Handling Multi-Component Systems

### Architecture Analysis Before Coding

When building multi-agent systems or complex features:

#### Step 1: Map Component Dependencies
```
Example for Analytics Agent:

AppModule (orchestrator)
  ├── MetricsService (core logic)
  │   ├── Metric entity (database)
  │   └── Embedding service (if needed)
  ├── AnalyticsController (API)
  │   └── MetricsService (dependency)
  ├── MetricsGateway (WebSocket)
  │   └── MetricsService (dependency)
  └── DatabaseConfig (infrastructure)

Create Order:
1. DatabaseConfig
2. Metric entities & repos
3. MetricsService
4. AnalyticsController
5. MetricsGateway
6. AppModule (final assembly)
```

#### Step 2: Identify Critical Path
```
Critical Path = Longest chain of dependencies

Example:
DatabaseConfig → Entities → Service → Controller → AppModule

This determines minimum creation order.
```

#### Step 3: Parallel Work Opportunities
```
Files that can be created in parallel
(no dependencies on each other):

Parallel Group 1:
- DTOs (schemas)
- Interfaces
- Constants/Configuration

Parallel Group 2 (after Group 1):
- Entity definitions
- Repository classes

Parallel Group 3 (after Group 2):
- Services
- Gateways

Parallel Group 4 (after Group 3):
- Controllers
- Routers

Final:
- Module file (AppModule)
```

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: Entry Point Only
```
WRONG:
main.ts is created
Everything else is missing

CORRECT:
Create complete stack:
- Configuration → Entities → Services → Controllers → Module → Main
```

### ❌ Anti-Pattern 2: Placeholder Code
```
WRONG:
async getMetrics() {
  // TODO: implement metrics retrieval
  return [];
}

CORRECT:
async getMetrics(metricType: string): Promise<Metric[]> {
  try {
    const metrics = await this.metricsRepository.find({
      where: { type: metricType, isActive: true },
      order: { createdAt: 'DESC' },
      take: 100,
    });
    
    return this.calculateAggregates(metrics);
  } catch (error) {
    logger.error('Error retrieving metrics', error);
    throw new MetricsRetrievalException(error.message);
  }
}
```

### ❌ Anti-Pattern 3: Incomplete Services
```
WRONG:
- Service created
- Only 1 of 5 methods implemented
- Database not connected
- Error handling missing

CORRECT:
- All CRUD operations implemented
- Database operations working
- Error handling for all paths
- Validation and security checks
- Logging for debugging
```

### ❌ Anti-Pattern 4: Missing Integration
```
WRONG:
- Service created independently
- Not injected into controller
- Not exposed via API
- Not connected to database

CORRECT:
- Service created with dependencies
- Injected into controller/module
- API endpoints expose service
- Database connected
- Integration verified
```

### ❌ Anti-Pattern 5: Skipped Files
```
WRONG:
Create: main.ts
Skip: AppModule
Skip: Services
Skip: Controllers
Skip: Entities
Skip: DTOs

CORRECT:
Create ALL files in proper sequence:
DatabaseConfig → Entities → Services → Controllers → Module → Main
```

## Task Assignment Best Practices

### For Agent Managers (Assigning Tasks)

When assigning coding tasks to agents:

#### 1. Provide Complete Context
```
✅ GOOD:
"Create the Analytics Agent with:
- Real-time metrics collection
- KPI calculation
- WebSocket dashboard updates
- Azure Application Insights integration
- Full database integration

See requirements in: /specs/analytics-agent-spec.md
Reference implementation in: /agents/escalation-agent/
Existing code in: /agents/

Create complete, production-ready implementation with:
- AppModule
- Services (metrics, analytics)
- Controllers
- Database entities
- DTOs/Interfaces
- WebSocket gateway
- Error handling
- Comprehensive tests"

❌ BAD:
"Create Analytics Agent"
```

#### 2. Define Success Criteria
```
Success Criteria:
- [ ] All components implemented (no placeholders)
- [ ] All CRUD operations working
- [ ] Real-time metrics functional
- [ ] API endpoints tested
- [ ] Database integration verified
- [ ] WebSocket connections working
- [ ] Error handling comprehensive
- [ ] Code review passed
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration verified with other agents
```

#### 3. Request Implementation Plan First
```
ASSIGNMENT FLOW:
1. Provide task description
2. ASK: "Create implementation plan first"
3. REVIEW: Plan with team
4. APPROVE: Plan
5. REQUEST: "Proceed with code generation following plan"
6. VERIFY: All components created

This prevents incomplete implementations!
```

### For Agents (Receiving Tasks)

When receiving a coding task:

#### 1. STOP - Don't Code Yet
```
MANDATORY FIRST STEP:
Do NOT start writing code immediately!
```

#### 2. Create Implementation Plan
```
1. Analyze project structure
2. Read requirements/specs
3. Identify existing code
4. Compare specs vs existing
5. Create comprehensive plan (see format above)
6. Present plan to user
7. Wait for approval
8. THEN proceed to code generation
```

#### 3. Request User Confirmation
```
BEFORE coding:

"Here's my implementation plan for [Feature]:

[Plan with all files, sequence, and components]

This plan covers:
✓ All required components
✓ Complete implementation (no placeholders)
✓ Proper sequence (no circular dependencies)
✓ Integration points
✓ Success criteria

Please confirm:
1. Plan is complete and correct
2. I should proceed with code generation
3. Any adjustments needed before I start coding"
```

#### 4. Execute Plan Completely
```
DURING coding:
- Follow sequence exactly
- Create ALL files (not just entry point)
- Complete each file fully
- No placeholder code
- No TODO comments (except legitimate future work)
- Verify each component before moving on
- Group changes by file
```

#### 5. Verify Completeness
```
AFTER coding:
- Verify all Phase 1 files created
- Verify all Phase 2 files created
- Verify all Phase 3 files created
- Verify all modifications applied
- Verify no placeholder code remains
- Verify integration points working
- Verify against success criteria
```

## Code Generation Checklist

### Before Starting Code Generation

```
MANDATORY CHECKS:

Project Understanding:
☐ Project structure understood
☐ Technology stack identified
☐ Existing patterns documented
☐ Database schema known
☐ API conventions understood
☐ Error handling patterns identified
☐ Testing patterns identified

Requirements Understanding:
☐ Functional requirements listed
☐ Non-functional requirements listed
☐ Success criteria defined
☐ Integration points identified
☐ Data models understood
☐ API contracts defined
☐ Performance requirements known

Plan Created:
☐ Implementation plan document created
☐ All components listed
☐ File creation sequence defined
☐ Dependencies documented
☐ Testing strategy defined
☐ Success criteria clear

User Confirmation:
☐ Plan reviewed by user
☐ Plan approved
☐ Any questions answered
☐ No ambiguities remain
☐ Ready to proceed with code generation
```

### During Code Generation

```
For Each File Created:

Code Quality:
☐ Complete implementation (not placeholder)
☐ Proper TypeScript types
☐ Input validation implemented
☐ Error handling implemented
☐ JSDoc comments on functions
☐ Inline comments for complex logic
☐ Follows project naming conventions
☐ Follows project patterns
☐ No console.log in production code
☐ No hardcoded secrets

Integration:
☐ Correct imports
☐ Correct exports
☐ Dependencies injected properly
☐ Services registered in module
☐ Routes registered
☐ Database connected
☐ Error handlers configured

Testing:
☐ Unit tests written
☐ Edge cases covered
☐ Error paths tested
☐ Integration points tested
```

### After Code Generation

```
Verification:

Completeness:
☐ All files from plan created
☐ All modifications applied
☐ No placeholder code remains
☐ All services implemented
☐ All controllers implemented
☐ All entities defined
☐ All DTOs defined
☐ All tests written

Functionality:
☐ Can compile/build
☐ No syntax errors
☐ Module initializes
☐ Services injectable
☐ Controllers accessible
☐ API endpoints working
☐ Database operations working
☐ Tests passing

Integration:
☐ Integrates with existing code
☐ No circular dependencies
☐ Configuration working
☐ Error handling working
☐ Logging working
☐ Monitoring ready

Documentation:
☐ README updated
☐ API documentation updated
☐ Architecture documented
☐ Setup instructions included
☐ Integration guide included
```

## Common Scenarios & Solutions

### Scenario 1: Agent Creates Only Entry Point

**Problem:**
Agent creates main.ts and claims task is done, but:
- AppModule doesn't exist
- Services are not implemented
- Controllers are missing
- Database integration is missing

**Root Cause:**
Agent jumped to code without analysis phase

**Solution:**
```
1. Stop agent at Step 0 (Analysis)
2. Require implementation plan FIRST
3. Review plan for completeness
4. Ensure plan includes ALL components
5. Only then proceed to code generation
6. Verify all files created after generation
```

**Prevention:**
- Always request plan before code
- Use checklist before approval
- Verify plan completeness

### Scenario 2: Incomplete Service Implementation

**Problem:**
Service created but:
- Only some methods implemented
- Others have "TODO" comments
- Database not connected
- Error handling missing

**Solution:**
```
1. Request implementation plan
2. Plan should list ALL methods/functions
3. Each method should be marked "complete"
4. Database integration should be explicit in plan
5. Error handling should be explicit
6. Verify after generation
```

### Scenario 3: Missing Integration Points

**Problem:**
Components created but:
- Not injected into module
- Not exposed via API
- Database not connected
- Not tested together

**Solution:**
```
1. Plan should explicitly show dependencies
2. Plan should show injection points
3. Plan should show API exposure
4. Plan should show database connections
5. Verify integration after generation
```

## Tools for Planning

### Markdown Plan Template
```markdown
# Implementation Plan: [Feature Name]

## Executive Summary
[2-3 sentences]

## Architecture Overview
[Component diagram or description]

## Components

### 1. Database Layer
- [ ] Entities: [list]
- [ ] Repositories: [list]
- [ ] Migrations: [if needed]

### 2. Business Logic Layer
- [ ] Services: [list]
- [ ] Validators: [list]
- [ ] Transformers: [list]

### 3. API Layer
- [ ] Controllers: [list]
- [ ] Routes: [list]
- [ ] Middleware: [list]

### 4. Infrastructure Layer
- [ ] Configuration: [list]
- [ ] Gateways: [list]
- [ ] Modules: [list]

## Files to Create
[Detailed list with order]

## Files to Modify
[List with changes]

## Dependencies Graph
[Show what depends on what]

## Implementation Sequence
[Phase-by-phase breakdown]

## Success Criteria
[Checklist of verifiable outcomes]

## Testing Strategy
[How will it be tested]
```

### Decision Tree for Planning

```
New Coding Task Assigned?
├─ YES
│  ├─ STOP - Don't code yet
│  ├─ Analyze project (Step 0)
│  ├─ Create plan (Step 1)
│  ├─ Present plan to user
│  ├─ User approves?
│  │  ├─ NO → Revise plan, resubmit
│  │  └─ YES → Proceed to code generation
│  ├─ Generate code following plan (Step 2)
│  ├─ Verify completeness (Step 3)
│  └─ All files created?
│     ├─ NO → Identify missing, create
│     └─ YES → Complete!
└─ NO → Continue current work
```

## Continuous Improvement

### Metrics to Track

```
For Each Coding Task:
- [ ] Plan created before code generation
- [ ] All files from plan created
- [ ] No placeholder code in final result
- [ ] All tests passing
- [ ] Code review score
- [ ] Lines of code per file (completeness metric)
- [ ] Compilation succeeds first try
- [ ] Integration successful first try
```

### Lessons Learned

After each major coding task:
```
1. What went well?
2. What could be improved?
3. Was the plan accurate?
4. Were any components missed?
5. Were any files unnecessary?
6. How long did each phase take?
7. What patterns emerged?
8. Update this guide with lessons learned
```

## Summary: The Right Way

### Before Coding
✅ Analyze project structure
✅ Read requirements completely
✅ Identify existing implementations
✅ Create comprehensive plan
✅ Get user approval
✅ Verify plan completeness

### During Coding
✅ Follow plan sequence exactly
✅ Create complete implementations
✅ No placeholder code
✅ Integrate as you go
✅ Verify each component

### After Coding
✅ Verify all files created
✅ Verify all modifications applied
✅ Verify no placeholders remain
✅ Verify integrations working
✅ Verify against success criteria
✅ Deliver complete, production-ready code

### The Wrong Way (What We're Fixing)
❌ Create only entry point
❌ Leave components incomplete
❌ Skip database integration
❌ Miss API endpoints
❌ Leave TODO comments
❌ Don't verify integration
❌ Deliver incomplete work

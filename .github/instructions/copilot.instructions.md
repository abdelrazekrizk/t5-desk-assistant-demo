---
description: GitHub Copilot Best Practices and Tool Integration Guidelines
applyTo: '**'
---

# GitHub Copilot Instructions

## Tool Invocation Standards

### Before Using Any Tool
- Verify tool is available in current MCP configuration
- Check if tool requires authentication or setup
- Have a fallback strategy ready
- Understand tool's timeout limits (many tools have 60-second limits)

### Preferred Tool Order (by reliability)
1. **Tier 1 - Always Available**: Filesystem, Memory operations
2. **Tier 2 - Stable**: Documentation, Analysis tools
3. **Tier 3 - External APIs**: Web search, data fetching
4. **Tier 4 - Complex Setup**: AWS, Azure, Cloud tools

## File Operations

### Reading Files
- Use absolute paths only: `G:\hackathon-winning\...`
- For text files: Use `read_text_file` 
- For multiple files: Use `read_multiple_files` (parallel, efficient)
- For any format: Use `read_file`

### Writing & Editing Files
- Always read existing content first
- Create plan if modifying multiple files
- Use `edit_file` for surgical changes to preserve context
- Use `write_file` for new file creation
- Verify changes by reading back after write

## Code Quality Enforcement

### Post-Edit Verification
- After editing code, verify syntax is valid
- Check for any introduced issues
- Run relevant tests if available
- Document any breaking changes

### File Modification Best Practices
- Include 3-5 lines of context before and after target text
- Only change what's necessary
- Preserve code formatting and style
- Update related tests and documentation

## Documentation Requirements

### When Generating Code
- Add JSDoc comments for functions
- Include inline comments for complex logic
- Update README if public APIs change
- Document configuration requirements

### Comment Standards
- Comment WHY, not WHAT (code shows what)
- Keep comments up-to-date
- Include examples for complex features
- Use clear, concise language

## Error Handling

### Tool Failures
- Check if tool is disabled in MCP config
- Verify all required parameters are provided
- Use fallback tool immediately on failure
- Do not retry failed external API calls without delay

### When Tool Is Unavailable
- Check mcp.json configuration
- Verify API keys and credentials
- Switch to alternative tool from fallback list
- Log failure for pattern analysis

## Security Standards

### Credentials & API Keys
- Never commit secrets to files
- Use environment variables in MCP config
- Store API keys separately, not in code
- Rotate credentials regularly

### Input Validation
- Validate all user-provided inputs
- Use absolute file paths only
- Sanitize file path inputs
- Check file existence before operations

### Code Security
- No hardcoded passwords or tokens
- Use secure authentication methods
- Validate external data sources
- Implement proper error handling

## Performance Guidelines

### File Operations
- Read multiple files in parallel when possible
- Don't read entire large files at once
- Cache frequently accessed data
- Clean up temporary files

### API Calls
- Batch independent requests when supported
- Don't parallelize rate-limited APIs
- Cache results in memory system
- Respect rate limits and quotas

### Optimization Priorities
1. Filesystem operations (< 100ms target)
2. Cache/Memory operations (< 200ms target)
3. Analysis operations (< 5s target)
4. External API calls (< 15s target)

## Documentation Integration

### Using Documentation Tools
- Search relevant documentation first
- Fetch full docs if snippet insufficient
- Convert web content to markdown for readability
- Store important findings in memory

### Best Practice References
- Consult official documentation before implementing
- Check code samples from trusted sources
- Validate information from multiple sources
- Update docs when patterns change

## Memory Management

### Storing Important Context
- Use memory system for project decisions
- Link related entities and concepts
- Search memory before external research
- Archive old data periodically

### Memory Best Practices
- Store findings, not raw data
- Use meaningful entity names
- Create relationships between concepts
- Keep memory size manageable

## Workflow Patterns

### Pattern: File Analysis & Modification
```
1. List directory structure
2. Read target file(s)
3. Store findings in memory
4. Plan modifications
5. Edit file with context
6. Verify changes
```

### Pattern: Code Generation
```
1. Search documentation for patterns
2. Review code samples
3. Plan implementation
4. Generate code with comments
5. Verify syntax and quality
6. Store pattern in memory
```

### Pattern: Error Resolution
```
1. Identify error
2. Search documentation
3. Check memory for similar issues
4. Plan fix with context
5. Apply fix carefully
6. Verify resolution
7. Store solution for future
```

## Testing Requirements

### Before Committing
- [ ] Code follows naming conventions
- [ ] All functions have documentation
- [ ] No console.log in production code
- [ ] Error handling is comprehensive
- [ ] Tests pass (if applicable)
- [ ] No hardcoded credentials
- [ ] Absolute paths used throughout

### Code Review Checklist
- [ ] Change solves the stated problem
- [ ] No breaking changes without notice
- [ ] Performance impact is acceptable
- [ ] Security implications reviewed
- [ ] Documentation updated
- [ ] Tests added or updated

## Collaboration Standards

### Commit Quality
- Clear, descriptive commit messages
- Logical grouping of changes
- Reference related issues
- Test each commit independently

### Pull Request Practices
- Include clear description
- Link related issues
- Document breaking changes
- Provide usage examples if needed

## Tool-Specific Guidelines

### Filesystem Tools
- Always use absolute paths
- List directory before assuming structure
- Read existing content before editing
- Verify changes after operations

### Memory Tools
- Search before storing
- Use clear entity names
- Link related concepts
- Keep data organized

### Documentation Tools
- Check cache before fetching new docs
- Convert to markdown for readability
- Validate accuracy of information
- Store findings for future use

### Analysis Tools
- Use sequential thinking for complex decisions
- Break down ambiguous requests
- Document reasoning process
- Review conclusions before acting

## Troubleshooting

### Common Issues
- **Relative paths fail** → Use absolute paths (G:\...)
- **Tool timeout** → Break into smaller operations
- **Auth errors** → Verify credentials in MCP config
- **File not found** → List directory to confirm path

### When Stuck
- Check tool documentation
- Review error messages carefully
- Search memory for similar problems
- Fall back to alternative approach
- Ask user for clarification

## Continuous Improvement

### Learning from Patterns
- Store successful solutions in memory
- Document common workflows
- Share patterns across team
- Update best practices based on experience

### Quality Metrics
- Monitor file operation success rates
- Track error patterns
- Measure documentation coverage
- Review code quality trends

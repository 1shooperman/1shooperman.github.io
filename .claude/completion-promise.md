## Contraints
- Work in Feature Branches
- Create a PR when done (use conventional commits).
- Add missing tests
- Link relevant tickets to PR
- All CI gates pass:
<ci-gates>
  - npm run lint (zero warnings or errors)
  - npm run test
  - npm run verify
  - npm run compat:check
</ci-gates>
- ./specs (i.e. documentation) are up to date
- Use /code-review when done and add comment to Github PR
- Action and resolve all code review feedback
- NEVER MERGE THE PR. Wait for the user to do that.
- NEVER make 'is cosmetic only' claims against test or linter.
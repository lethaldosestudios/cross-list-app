We just implemented the feature described in the attached plan.

Please do a thorough code review:
1. Make sure that the plan was correctly implemented.
2. Look for any obvious bugs or issues in the code.
3. Look for subtle data alignment issues (e.g. expecting snake_case but getting camelCase or expecting
data to come through in an object but receiving a nested object like {data:{}})
4. Look for any over-engineering or files getting too large and needing refactoring
s. Look for any weird syntax or style that doesn't match other parts of the codebase (we require a
functional programing style)

Document your findings in docs/features/<N>_REVIEW.md unless a different file name is specified.
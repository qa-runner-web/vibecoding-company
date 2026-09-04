# Review Checklist

## Tests

- [ ] Run the relevant automated test suite for the change.
- [ ] Record the exact test command and confirm it passes.
- [ ] Review any warnings or skipped tests before requesting review.

## Diff scope

- [ ] Confirm the diff contains only the intended files and changes.
- [ ] Review the complete diff for accidental edits, generated files, and secrets.
- [ ] Run `git diff --check` and resolve whitespace errors.

## Branch identity

- [ ] Confirm the current branch is the intended feature branch.
- [ ] Confirm the target base branch before opening a pull request.
- [ ] Confirm the pushed branch and pull request use the same source branch.

# GitHub Rules

## Branch Rules

When the user requests branch creation:

1. **Branch name**: Use the name provided by the user; if not specified, suggest one based on the task.
2. **Create and switch**: Use `git switch -c <branch-name>` to create and switch in one step.
3. **Verify**: Confirm the current branch is correct.

### Branch naming convention

```
<type>/<description>
```

Examples: `feat/user-auth`, `fix/login-bug`, `chore/update-deps`

---

## Commit Rules

When the user requests a commit, follow the steps below. Do NOT create a PR unless explicitly asked.

1. **Check branch**: Run `git branch --show-current`.
2. **Review changes**: Run `git status` and `git diff`.
3. **Stage files**: Use `git add <file>` selectively — never `git add -A` or `git add .`.
4. **Commit**: Write a clear commit message reflecting the changes.

### Commit message format

```
<type>: <summary>

<details (if needed)>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

### Rules

- Never commit directly to main/master. Ask the user for a branch name if none exists.
- Never commit sensitive files (`.env`, credentials, etc.).
- Never force push unless explicitly requested.

---

## Branch Cleanup Rules

When the user requests cleanup of merged branches:

1. **Find merged branches**: Run `git branch --merged main`
2. **Delete local branches**: Run `git branch -d <branch>` for each merged branch (skip main/master)
3. **Prune remote tracking refs**: Run `git remote prune origin`

---

## PR Rules

Only run when the user explicitly requests a PR (e.g. "PR 올려줘", "open a PR").

1. **Check branch and commits**: Confirm current branch and commit state.
2. **Push if needed**: Run `git push -u origin <branch-name>` if not yet pushed.
3. **Create PR**: Run `gh pr create`.

### PR format

Write the PR title in English, but write the body content in Korean.

```
gh pr create --title "<title>" --body "$(cat <<'EOF'
## 변경 내용
- <변경 내용 요약>

## 테스트 계획
- [ ] <테스트 항목>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

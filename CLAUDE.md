# CLAUDE.md — 온스케줄 프로젝트 룰

## Git 작업 권한 — 사용자 명시 지시 없이는 절대 수행 X

**다음 작업은 사용자가 명시적으로 지시한 경우에만 수행한다:**

- `git commit` — 커밋
- `git push` — 푸시
- `git merge` — 머지
- `gh pr create` — PR 생성

**절대 자동·선제적으로 수행하지 않는다.** "작업 마무리 흐름상 자연스럽다"는 이유로도 X. 사용자가 직접 "커밋해", "머지해", "푸시해", "PR 만들어"라고 명시할 때까지 대기.

**올바른 마무리 패턴:**
1. 코드 변경 완료
2. typecheck/test/build 등 검증 (이건 자동 OK)
3. `git status`로 변경 요약 보고
4. 사용자 결정 대기 — 사용자가 commit/push/merge/PR을 시키면 그때 수행

**Why:** 사용자가 git 흐름을 직접 통제하길 원함. 머지·푸시는 production 영향 + 되돌리기 어려운 액션. 사용자 명시 지시 없이 진행하면 사용자가 검토 기회 없이 production 배포되거나 PR 생성됨. "이전에 한 번 시켰으니 다음에도 OK"는 X — 매번 명시 필요.

## main 브랜치 직접 작업 금지

- 모든 코드 작업은 feature branch에서
- 머지 직후 즉시 새 feature branch 체크아웃해서 main에서 떠남
- 명명: `feat/`, `fix/`, `chore/`, `refactor/`, `docs/` + task 단위

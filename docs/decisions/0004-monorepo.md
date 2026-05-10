# ADR-0004: 모노레포 — npm workspaces + Turborepo

상태: 채택
일자: 2026-05-03 (갱신: 2026-05-05 — pnpm → npm 전환)

## 컨텍스트

ADR-0003에서 코드베이스가 3개로 결정됨: API(NestJS) + Mobile(Expo) + Web(Next.js). 추가로 타입·Zod 스키마·API 클라이언트·Tailwind 토큰 등 공유 패키지가 필요하다.

제약:
- 1인 운영 — 빌드/CI/배포 손이 적게 가야 함
- AI 코드 생성 도구가 한 컨텍스트에서 여러 앱을 인지할 수 있어야 함
- 변경이 잦은 초기 단계에서 타입 동기화 자동화 필요
- **사용자 과거 경험**: pnpm + Turborepo 조합으로 RN 앱이 런타임에 크래시 (이중 React 인스턴스 추정) → 결국 프로젝트 뒤집어 엎음. 같은 함정 재현 회피 우선

## 검토한 옵션

| 옵션 | RN/Expo 함정 | EAS 호환 | 트라우마 회피 | 셋업 시간 | 장기 수명 |
|---|---|---|---|---|---|
| A. 멀티레포 (3개 GitHub 저장소) | 🟢 없음 | 🟢 | 🟢 | 🔴 PR 동기화 부담 | 🟢 |
| B. pnpm workspaces + Turborepo | 🔴 4개 (`.npmrc` hoist 패턴 + Metro resolver 강제 단일화 필요), [eas-cli#3247](https://github.com/expo/eas-cli/issues/3247) 미해결 | 🟠 | 🔴 재현 위험 | 🟡 보일러플레이트 fork 필요 | 🟢 |
| **C. npm workspaces + Turborepo** | 🟢 평면 node_modules → 이중 인스턴스 함정 자체 발생 불가 | 🟢 EAS internal이 npm 가정에 가장 가까움 | 🟢 안전 | 🟢 0 | 🟢 |
| D. Yarn berry v4 + nodeLinker:node-modules + Turborepo | 🟡 PnP 끄면 OK | 🟢 | 🟢 | 🟡 `.yarnrc.yml` 학습 | 🟢 |
| E. Yarn v1 (Classic) + Turborepo | 🟢 역사적 표준 | 🟢 최강 | 🟢 | 🟢 | 🔴 EOL — 신규 시작에 부적합 |
| F. Nx | - | - | - | 🔴 학습 곡선 | 🟢 |

## 결정

**C 채택.** npm workspaces로 패키지 관리 + Turborepo로 빌드/태스크 오케스트레이션.

(이전 결정: pnpm workspaces — 2026-05-05에 npm으로 전환. 사유는 "근거" 섹션 참조)

## 디렉토리 구조

```
05.on-schedule/
  apps/
    api/                  ← NestJS (보일러플레이트 이전)
    mobile/               ← Expo (사장님 앱)
      eas.json
      app.json
      metro.config.js
      package.json        ← "main": "expo-router/entry" 명시
    web/                  ← Next.js (고객 예약 페이지)
  packages/
    shared/               ← Zod 스키마, 도메인 타입, 상수
    api-client/           ← REST 클라이언트 (mobile/web 공용)
    config-tailwind/      ← Tailwind preset (NativeWind preset 포함, mobile/web 공유)
    config-eslint/        ← ESLint 공통 설정
    config-tsconfig/      ← tsconfig 공통 설정
  docs/                   ← 기획·결정·설계 문서
  package.json            ← workspaces: ["apps/*", "packages/*"]
  package-lock.json
  turbo.json
  .npmrc
  .gitattributes          ← package-lock.json -diff
```

### 루트 `package.json` 핵심 필드

```json
{
  "name": "on-schedule",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "engines": { "node": ">=20.18.0" },
  "packageManager": "npm@10.9.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck"
  }
}
```

### 워크스페이스 의존 표기

```json
// apps/mobile/package.json
{
  "main": "expo-router/entry",
  "dependencies": {
    "@on-schedule/shared": "*",
    "@on-schedule/api-client": "*",
    "@on-schedule/config-tailwind": "*"
  }
}
```

(npm은 `workspace:*` 프로토콜 미지원 — `"*"`로 워크스페이스 자동 해석)

### `.npmrc`

```ini
legacy-peer-deps=false
fund=false
audit=false
save-exact=false
```

### `.gitattributes`

```
package-lock.json -diff
```

(lock 파일은 사람이 읽지 않음 — PR diff 숨김 처리로 코드 리뷰 신호 노이즈 제거)

## 근거

### npm 채택 사유 (이전 pnpm 결정 뒤집은 이유)

1. **사용자 과거 트라우마 회피 (1순위)**: pnpm의 isolated symlink 구조는 RN/Metro와 근본 충돌하여 "이중 React 인스턴스" 런타임 크래시를 유발한 전례가 있음. 회피 가능하지만 디버깅 비용이 1인 운영에 치명적.
2. **평면 node_modules가 RN/Expo 친화**: Metro resolver가 단일 경로에서 모든 모듈을 찾으므로 이중 인스턴스 발생 자체가 구조적으로 불가능.
3. **EAS Build 호환 최강**: EAS internal이 historical하게 yarn v1/npm 평면 구조를 가정. pnpm 관련 알려진 미해결 이슈([eas-cli#3247](https://github.com/expo/eas-cli/issues/3247)) 회피.
4. **npm 7+ peer dep 자동 설치**: RN/Expo의 복잡한 peer dep을 자동 해석. yarn v1엔 없는 기능.
5. **셋업 시간 0**: 보일러플레이트 fork 없이 `npm init` + `workspaces` 필드만으로 시작.
6. **AI 코드 생성 호환**: npm이 가장 보편적이라 Claude/Cursor가 뽑는 코드의 1차 가정.
7. **단점은 1인 컨텍스트에서 무력화**: install 속도(2~3배 느림) → 매일 install 안 함 + CI 캐싱으로 0. 디스크 사용량(5~10GB) → SSD 가격 무의미. lockfile 충돌 어려움 → 솔로라 PR 충돌 거의 없음.

### Turborepo 유지 사유

- 변경 감지 + 빌드 캐시 → CI 시간 단축
- Vercel·EAS 둘 다 1급 지원
- npm workspaces와 호환 100%
- 1인 운영 빌드 인프라 부담 ↓

### Nx 비채택 사유

- 강력한 그래프·코드 생성기는 1인 + MVP 규모에 오버엔지니어링
- 학습 곡선이 Turborepo보다 가파름

## 결과

### 즉시 액션
- NestJS 보일러플레이트(`98.boiler-plate-backend`)를 `apps/api/`로 이동
- 루트 `package.json`에 `workspaces: ["apps/*", "packages/*"]` 명시
- `packageManager: "npm@10.9.0"` 핀
- `apps/mobile/package.json`의 `main` 필드 `"expo-router/entry"` 고정 ([eas-cli#2280](https://github.com/expo/eas-cli/issues/2280) 회피)
- `.gitattributes`로 `package-lock.json` PR diff 숨김
- 공유 타입은 `packages/shared`에 두고 모든 앱에서 import
- API 클라이언트는 1차 수동(Zod 스키마 공유) — OpenAPI 자동 생성은 안정화 후 검토
- CI 1개로 3개 앱 빌드/테스트, 변경된 앱만 배포 (Turborepo `--filter`)
- `packages/config-tailwind`에 NativeWind preset 포함 — mobile/web 디자인 토큰 단일 진실

### EAS Build 셋업
- `apps/mobile/eas.json` 위치
- `eas build --profile production --platform all --auto-submit`로 빌드+제출 한 명령
- OTA: `eas update --branch production` (재심사 우회, ADR-0011 정합)
- 베타는 EAS Free tier (월 30회) 충분 (ADR-0014 정합)

### 알려진 함정 (인지)
- `package-lock.json` 사이즈 50~100MB 가능 → `.gitattributes`로 diff 숨김 처리
- npm은 `workspace:*` 프로토콜 미지원 → `"*"` 표기 사용
- npm install 후 Metro cache stale 가능 → `npx expo start -c`로 클리어

### 재검토 트리거
- `npm install` cold start 시간이 3분 초과 → pnpm + byCedric 보일러플레이트 또는 Yarn berry 재검토
- 모노레포 빌드 시간 5분 초과 → Turborepo 원격 캐시 본격 활용 또는 Nx 검토
- 외부 협업자 합류 → 일부 패키지 분리 또는 권한 모델 재검토
- npm workspaces 자체에서 Expo SDK 호환 알려진 이슈 발생 → Yarn berry v4(node_modules 모드)로 전환

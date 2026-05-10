# ADR-0003: 기술 스택 — Expo + Next.js + NestJS + Railway 통합

상태: 채택
일자: 2026-05-03 (갱신: 2026-05-05 — ORM·호스팅·라이브러리 결정 갱신, 디자인 시스템 채택)

## 컨텍스트

ADR-0002에서 사장님 앱 + 고객 웹 + 백엔드 API 분리가 결정됨. 각 영역의 구체 기술을 선택해야 한다.

제약:
- 1인 운영 (인프라·DB 백업·모니터링까지 혼자)
- 빠른 출시 (MVP 2~3개월 목표)
- AI 생산성 (Claude Code가 코드를 잘 뽑는 생태계)
- 한국 결제(토스페이먼츠) + 알림톡(중계사 SDK) 호환
- NestJS 보일러플레이트 이미 작성됨 (매몰비 1~2일치)
- **비용 최소화 1순위** (사용자 명시)
- **플랫폼 분리 불편함 회피** — 한 곳 통합 선호

## 검토한 옵션

### 백엔드 프레임워크
| 옵션 | 장점 | 단점 |
|---|---|---|
| **A. NestJS** | 보일러플레이트 활용, 모듈 구조, BullMQ/Schedule 등 풍부, AI 학습 데이터 풍부 | 약간 무거움 |
| B. Hono + Drizzle | 가벼움, 빠름 | 생태계 작음, 서버리스 가정 |
| C. Supabase Edge Functions만 | 인프라 0 | 복잡한 비즈니스 로직 어려움 |
| D. Next.js Route Handlers | 풀스택 통합 | 모바일 클라이언트가 Server Actions 못 씀 |

### 모바일
| 옵션 | 장점 | 단점 |
|---|---|---|
| **Expo (React Native)** | OTA 업데이트, EAS Build, 한국 RN 생태계 풍부 | 네이티브 모듈 일부 제약 |
| Flutter | 성능 | Dart 학습, AI 생산성 낮음 |
| Native(Swift/Kotlin) | 최고 성능 | 1인 + 빠른 출시 불가능 |

### ORM
| 옵션 | 장점 | 단점 |
|---|---|---|
| **Prisma** | NestJS 표준 통합, Studio UI, AI 코드 생성 친화 (학습 데이터 풍부), Type 자동 생성 | 런타임 client 무거움 |
| Drizzle | SQL 친화, 가벼움 | NestJS 통합 패턴 약함, AI 학습 데이터 적음 |
| TypeORM | NestJS 보일러플레이트 디폴트 | 유지보수 둔함, 마이그레이션 미흡 |

### API + DB + Redis 호스팅 (통합 vs 분리)
| 옵션 | 베타 비용 | 한국 응답 | 콘솔 | 운영 부담 |
|---|---|---|---|---|
| **Railway 통합** (NestJS + Postgres + Redis + Volume) | $15-25/월 | 🟡 싱가폴 80ms | 🟢 1개 | 🟢 매우 적음 |
| Fly.io 무료 + Neon + Upstash + R2 | $0 | 🟢 도쿄+서울 | 🔴 4개 | 🟡 |
| Fly.io Hobby + Neon + Upstash + R2 | ~$8.6 | 🟢 도쿄+서울 | 🔴 4개 | 🟡 |
| AWS App Runner + RDS + ElastiCache + S3 | $11(1년)→$27 | 🟢 서울 5ms | 🟡 콘솔 복잡 | 🟡 IAM 학습 |
| AWS ECS + ALB + RDS + ElastiCache | $90+ | 🟢 서울 | 🟡 | 🔴 |

### 결제 / 알림톡
각각 ADR-0007, ADR-0008 참조.

## 결정

| 영역 | 선택 |
|---|---|
| **디자인 시스템** | **`docs/design/` 채택 (ADR-0016 참조)** — Wanted DS 기반, 브랜드 캐러멜 #E8761A |
| **폰트** | **Pretendard JP (본문) + Wanted Sans (디스플레이/숫자) + JetBrains Mono (코드)** — 모두 OFL CDN 로드 |
| **아이콘** | **Lucide Icons** (24px, stroke 1.75) — MIT |
| 모바일 (사장님) | **Expo SDK 53 + Expo Router + NativeWind v4 (Tailwind v3)** |
| 모바일 푸시 | **Expo Push Notifications** |
| 모바일 UI 컴포넌트 | **react-native-reusables** (shadcn/ui RN 포트, NativeWind v4 기반) |
| 모바일 탭 | **Native Tabs** (`expo-router/unstable-native-tabs`) — ADR-0011 |
| 모바일 폼 | **react-hook-form + Zod resolver** |
| 모바일 데이터 | **TanStack Query v5** |
| 모바일 글로벌 상태 | **Zustand** (nuqs 대체) |
| 웹 (고객 예약) | **Next.js 15 App Router + Tailwind v3 + shadcn/ui** |
| 웹 폼 | **react-hook-form + Zod resolver** |
| 웹 데이터 | **TanStack Query v5** |
| 웹 URL 상태 | **nuqs** (필터·검색·페이지네이션) |
| 백엔드 API | **NestJS** (보일러플레이트 유지) |
| API 스타일 | **REST + Zod 스키마** (1차) — tRPC는 안정화 후 검토 |
| **NestJS Zod 통합** | **`nestjs-zod`** (createZodDto + ZodValidationPipe + ZodSerializerInterceptor) |
| **ORM** | **Prisma** + zod-prisma-types (하이브리드 — DB 모델 자동 생성, 입력 검증 수동) |
| 사장님 인증 | NestJS Passport + 카카오 OAuth |
| 고객 인증 | 없음 (ADR-0005 참조) |
| 큐/스케줄 | **NestJS Schedule + BullMQ + Redis** |
| **API + DB + Redis + 이미지 호스팅** | **Railway 통합** (Hobby plan) |
| 결제 | **토스페이먼츠** (ADR-0007) |
| 알림톡 | **솔라피** (ADR-0008) |
| 모니터링 | **Sentry Free** (모바일/웹/서버 통합) |
| 호스팅 (웹) | **Vercel Hobby** |
| 모바일 배포 | **EAS Build Free + EAS Submit** |
| **도메인** | **Vercel Domains** (사용자 공개 시점에 결제, 베타엔 `vercel.app` 무료) |
| 모노레포 | **npm workspaces + Turborepo** (ADR-0004 참조) |
| 폭증 대응 | Application layer (BullMQ + 캐싱 + Rate limiting) — ADR-0015 |

## 근거

### Railway 통합 채택 사유 (이전 결정 변경)
1. **사용자 가치 정합**: 비용 최소화도 중요하지만, **플랫폼 분리 불편함 회피**가 더 큰 가치로 결정됨
2. **한 콘솔 관리**: NestJS·Postgres·Redis·Volume 모두 Railway 한 곳. 환경변수·로그·메트릭·청구서 통합
3. **internal network 1ms**: 같은 데이터센터 안에서 통신 → DB 쿼리 응답 매우 빠름
4. **GitHub auto-deploy**: push만으로 배포 (Nixpacks 자동)
5. **자동 백업**: Postgres daily snapshot 7일 보존 (Supabase Free 백업 자체 셋업 면제)
6. **점진 확장 가능**: PMF 후 AWS 마이그레이션 자연스러움 (Postgres 표준)

### 한국 응답 80ms (싱가폴) 감수 이유
- 인간 인지 한계 ~100ms 안
- 사장님 도구라 1초 응답 차이 인지 X
- PMF 후 매장 100곳+ 시점에 AWS 서울 리전 마이그레이션 검토

### Prisma 채택 사유 (이전 Drizzle 결정 변경)
- **NestJS 표준 통합**: `@nestjs/prisma` 등 패턴 풍부
- **AI 코드 생성**: Claude Code가 Prisma를 더 잘 다룸 (학습 데이터)
- **Studio UI**: 콘솔에서 데이터 즉시 확인
- **zod-prisma-types**: Prisma schema → Zod 자동 생성으로 packages/shared 통합
- Drizzle의 "가벼움·SQL 친화"는 1인 운영에 결정적 가치 아님

### NestJS 유지
- 모바일 클라이언트가 들어오면 Server Actions 통합 패턴이 깨지므로 순수 API 백엔드 필요
- NestJS의 모듈/스케줄/큐 생태계는 결제 웹훅 + 알림톡 리마인드 + 노쇼 처리에 잘 맞음
- 보일러플레이트 매몰비 회수

### Expo + NativeWind v4 + react-native-reusables
- **NativeWind v5는 preview 상태** (2026-05-05 검수 결과) → v4 stable 채택
- v4는 Tailwind v3 기반 → web/mobile 양쪽 Tailwind v3 통일
- react-native-reusables는 NativeWind v4 1급 지원 (shadcn/ui RN 포트)
- 한국 RN 생태계 + EAS Build로 빌드 인프라 외주화

### Next.js + shadcn/ui + RHF + nuqs + React Query
- shadcn/ui Form은 RHF 기반이라 자연스러운 통합
- nuqs는 URL 상태 (필터·검색)로 mobile과 패턴 분리됨 — 의도된 분리
- React Query v5는 web/mobile 동일 패턴 (서버 상태 관리)
- mobile은 nuqs 못 씀 → Zustand로 글로벌 상태 처리

## 결과

### 즉시 액션
- `docs/00.기획/09.기술타당성.md`를 이 결정으로 채워야 함
- 모노레포 골격 작업 (ADR-0004)
- NestJS 보일러플레이트(`98.boiler-plate-backend`) → `apps/api/`로 이동, TypeORM → Prisma 전환
- Railway 프로젝트 생성 + Postgres·Redis add-on
- 솔라피 계정 등록, Apple/Google 개발자 계정 갱신

### 베타 인프라 (ADR-0014 참조)
- API + DB + Redis + Volume: Railway Hobby ~$15-25/월
- Web: Vercel Hobby 무료
- 모바일 빌드: EAS Free 무료
- 모니터링: Sentry Free 무료
- 알림톡: 솔라피 ~6,750원/월 (베타 5곳)
- 도메인: vercel.app 무료 (사용자 공개 시점에 Vercel Domains 결제)

### 라이브러리 통합 우선순위
1. `tooling/typescript` — 5개 preset (base, nestjs, nextjs, expo, library)
2. `tooling/tailwind` — Tailwind v3 + 카라멜 팔레트 + NativeWind v4 preset
3. `packages/shared` — Zod 스키마 (zod-prisma-types 자동 생성 + 입력 검증 수동)
4. `apps/api` — Prisma + nestjs-zod + Railway 배포
5. `packages/api-client` — REST 클라이언트 + Zod 응답 파싱
6. `apps/web` — shadcn/ui + RHF + React Query + nuqs
7. `apps/mobile` — react-native-reusables + RHF + React Query + Zustand

### 재검토 트리거
- API가 성장해 모듈 경계가 무거워지면 마이크로서비스 분할 검토
- AI 코드 생성 도구가 tRPC를 더 잘 다루게 되면 REST → tRPC 전환 검토
- 매장 100곳+ 도달 → Railway → AWS App Runner (서울) + Aurora 마이그레이션
- Railway 비용이 예상치 5배 초과 시 → 분리 (Fly.io + Neon + Upstash) 재검토
- NativeWind v5 stable 릴리즈 시 → v4 → v5 마이그레이션 검토

# @on-schedule/web

온스케줄 고객 웹 + 마케팅 랜딩.

## 스택
- Next.js 15 (App Router)
- React 19
- Tailwind v3 + `@on-schedule/tailwind-config/web` preset
- shadcn/ui (CLI install 예정)
- React Hook Form + Zod resolver
- TanStack Query v5
- nuqs (URL 상태)
- Lucide Icons

## 디자인 시스템
- 출처: [`docs/design/`](../../docs/design/) (Claude Design 산출물)
- 토큰: [`packages/tailwind-config/`](../../packages/tailwind-config/)
- UI 컴포넌트: [`packages/ui/`](../../packages/ui/) (shadcn/ui 기반)
- ADR: [ADR-0016](../../docs/decisions/0016-design-system.md)

## 개발

```bash
# 루트에서
npm install
npm run dev --workspace=@on-schedule/web

# 또는 apps/web에서
cd apps/web
npm run dev
```

## 디렉토리

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 + 폰트 + 메타
│   ├── globals.css          # 디자인 시스템 import + 페이지 특화 스타일
│   └── page.tsx             # 랜딩 페이지 진입점
├── components/
│   └── landing/             # 랜딩 페이지 섹션 컴포넌트
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── LogoBar.tsx
│       ├── Problems.tsx
│       ├── Solution.tsx
│       ├── Compare.tsx
│       ├── Faq.tsx
│       ├── FinalCta.tsx
│       └── Footer.tsx
└── lib/
    └── utils.ts             # cn() shadcn 표준 헬퍼
```

## 다음 작업
- [ ] shadcn/ui CLI init + 베이스 컴포넌트 (Button, Input, Form, Dialog) install
- [ ] 폼 백엔드 연결 (Tally / Supabase / Resend)
- [ ] 랜딩 A/B 테스트 (디자인 시스템 hero variants 적용)
- [ ] SEO 메타 + OG 이미지
- [ ] 분석 도구 연결 (PostHog / Vercel Analytics)
- [ ] 고객 예약 페이지 (`/store/[storeId]/reserve`)

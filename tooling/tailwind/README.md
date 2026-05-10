# @on-schedule/tailwind-config

온스케줄 모노레포 공유 Tailwind 설정. **디자인 시스템(`docs/design/`) 기반.**

## 출처 및 변경 이력

- **베이스**: Wanted Design System (CC BY 4.0) — Korean 직업 플랫폼 Wanted의 공개 디자인 시스템
- **튜닝**: 베이커리·디저트 SaaS 컨텍스트에 맞춰 따뜻한 캐러멜 브랜드 색 + 도메인 시멘틱
- **원본 디자인 시스템**: [`docs/design/`](../../docs/design/) (Claude Design 산출물 + chat transcript 보존)
- **결정 기록**: ADR-0016 (디자인 시스템 채택)

## 구성

| 파일 | 역할 |
|---|---|
| `colors.ts` | 디자인 시스템 색 팔레트 (TS export) |
| `theme.ts` | Tailwind theme.extend (타이포·간격·라운드·섀도·모션) |
| `web.ts` | Next.js + shadcn/ui 용 Tailwind v3 preset |
| `native.ts` | Expo + NativeWind v4 용 preset |
| `globals.css` | shadcn/ui CSS 변수 매핑 + 폰트 import + 타이포 utility 클래스 |
| `index.ts` | 진입점 — `colors`, `sharedTheme` export |

## 핵심 토큰

### 브랜드 색
| 역할 | HEX | 용도 |
|---|---|---|
| **brand.500** | `#E8761A` | ⭐ Primary 캐러멜 — 페이지 5~10% 이내, CTA·강조만 |
| brand.50 | `#FFF4EA` | 배경, 셀렉티드 상태 소프트 |
| brand.700 | `#9A4708` | accent.foreground 용 (대비 ↑) |

### Cream (보조 따뜻한 톤)
| 역할 | HEX | 용도 |
|---|---|---|
| cream.50 | `#FBF7F1` | 히어로 배경 (`--bg-hero`) |
| cream.100 | `#F4ECDC` | 빈 상태 일러스트 배경 |

### Status (도메인 시멘틱 — 디자인 시스템 §3.1)
| 상태 | HEX | 용도 |
|---|---|---|
| confirmed | `#00BF40` | 예약 확정, 알림톡 발송 성공 |
| pending | `#FFA800` | 대기, ⚠ 차단 코드 |
| noshow | `#FF4242` | 노쇼, 거절, 결제 실패 |
| cancelled | `#AEB0B6` | 취소 |

→ **캐러멜은 status 색으로 사용 금지.** 브랜드 전용.

### Neutral (Wanted DS canonical, cool gray)
- `neutral.0` (`#FFFFFF`) → `neutral.1000` (`#17171A`)
- 13단계 + tertiary tints
- 텍스트는 `fg.primary` (`rgba(23,23,25,0.95)` 반투명 블랙) 권장

## 타이포 스케일 (디자인 시스템 §3.2)

| 클래스 | 사이즈 | 폰트 | 용도 |
|---|---|---|---|
| `t-display-1` | 56px / 1.1 | **Wanted Sans** | 히어로 |
| `t-display-2` | 40px / 1.2 | Wanted Sans | 큰 디스플레이 |
| `t-h1` ~ `t-h4` | 36 → 20px | Pretendard JP | 제목 |
| `t-body-l` / `t-body` / `t-body-s` | 18 / 16 / 14px | Pretendard JP | 본문 |
| `t-label-l` / `t-label` / `t-label-s` | 16 / 14 / 12px (semibold) | Pretendard JP | 라벨 |
| `t-caption` | 12px | Pretendard JP | 캡션 |
| **`t-numeral-l` / `t-numeral`** | 32 / 20px | **Wanted Sans** + tabular-nums | KPI·가격·시간 |
| `t-code` | 13px | **JetBrains Mono** | 시간·코드·예약번호 |

## Spacing / Radius / Shadow

- **Spacing**: 4px base. `space-1` (4px) ~ `space-20` (80px)
- **Radius**: `xs/sm/md/lg/xl/2xl/pill` — 카드는 `lg` (14px), 모달은 `2xl` (28px)
- **Shadow**: 4단계 (`shadow-1` ~ `shadow-4`) + `shadow-focus` (캐러멜 톤 포커스 링)
- **Motion**: `transition-1/2/3` (120/200/320ms) + `ease-standard` / `ease-emphasized`

## 사용

### apps/web (Next.js 15 + shadcn/ui)

```ts
// apps/web/tailwind.config.ts
import preset from '@on-schedule/tailwind-config/web';
import type { Config } from 'tailwindcss';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

```css
/* apps/web/src/app/globals.css */
@import '@on-schedule/tailwind-config/globals.css';
```

### apps/mobile (Expo + NativeWind v4)

```ts
// apps/mobile/tailwind.config.ts
import preset from '@on-schedule/tailwind-config/native';
import type { Config } from 'tailwindcss';

export default {
  presets: [require('nativewind/preset'), preset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/**/*.{ts,tsx}',
  ],
} satisfies Config;
```

### 비-Tailwind 영역 (StyleSheet, 알림톡 템플릿 등)

```ts
import { colors } from '@on-schedule/tailwind-config/colors';

// React Native StyleSheet
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.primary,
    borderColor: colors.line.normal,
  },
});

// 알림톡 템플릿 카피
const brandPrimary = colors.brand[500]; // #E8761A
```

## 디자인 정책 (디자인 시스템 README §2-§3)

### 콘텐츠 톤
- 사장님 친화 + 차분한 전문성 ("노쇼 1건당 평균 44.3만원, 선결제로 막을 수 있어요")
- 시스템 메시지 짧고 사실적 ("예약 확정됨", "오후 3시 픽업")
- Painkiller 어휘 ("관리" → "노쇼 막기", "픽업 누락 방지")

### 인칭/호칭
- 사장님 화면: 사장님 = "나" ("내 예약", "내 가게")
- 고객 화면: 가게 이름 그대로 ("베이커리 우진의 예약 페이지")
- 시스템→사장님: "사장님" 호칭, 존댓말 ("예약이 들어왔어요")
- 시스템→고객: 친근 존댓말 ("3월 14일 오후 3시 픽업이에요!")

### 표기
- 한국어 본문 + 숫자/금액/시간은 아라비아 숫자
- 천 단위 콤마, "원" 접미사 ("30,000원", "44.3만원")
- 시간: "오후 3:00" 또는 "15:00"
- **이모지 인터페이스에 사용 금지** — 상태는 컬러 닷·뱃지·아이콘으로

### 비주얼
- **캐러멜 사용 면적은 좁게** (5~10% 이내) — 주요 CTA·강조 숫자·셀렉티드만
- **그라디언트 거의 사용 안 함** — protection gradient(흰→투명)만 OK
- 카드: 흰색 배경 + 1px 보더 + 14~20px 라운드, 섀도우는 hover/floating만
- 텍스트는 거의 항상 반투명 블랙 (`fg.primary`)
- Selected: 액센트 보더 2px + 부드러운 배경 `brand.50`

### 아이콘
- **Lucide Icons** (24px 그리드, stroke 1.75) — MIT, 톤 일치
- 폰트 아이콘 사용 안 함 — SVG 인라인 또는 `<i data-lucide="...">`
- 이모지 사용 안 함

## 도메인 아이콘 매핑 (디자인 시스템 §4.1)

| 의미 | Lucide |
|---|---|
| 예약 | `calendar-check` |
| 노쇼 | `user-x` |
| 알림톡 | `message-square` |
| 결제 | `credit-card` |
| 픽업 완료 | `package-check` |
| 고객 | `user` / `users` |
| 메뉴 | `cake` / `utensils` |
| 통계 | `bar-chart-3` |
| 설정 | `settings` |

## 인터랙션 상태 (디자인 시스템 §3.6)

- **Hover**: 표면 한 단계 어둡게 (흰→`neutral.50`, 캐러멜→`brand.600`)
- **Press**: 추가로 한 톤 더 (`-700`) + 미세 scale `0.98`
- **Focus**: 항상 `shadow-focus` (캐러멜 톤 3px alpha 28%)
- **Disabled**: opacity 0.4, cursor not-allowed
- **Selected**: 보더 `2px brand.500` + 배경 `brand.50`

## 참조

- 원본 디자인 시스템: [`docs/design/project/colors_and_type.css`](../../docs/design/project/colors_and_type.css)
- UI 키트 (사장님): [`docs/design/project/ui_kits/owner/`](../../docs/design/project/ui_kits/owner/)
- UI 키트 (고객): [`docs/design/project/ui_kits/customer/`](../../docs/design/project/ui_kits/customer/)
- 랜딩 페이지: [`docs/design/project/landing/`](../../docs/design/project/landing/)
- 미리보기 카드: [`docs/design/project/preview/`](../../docs/design/project/preview/)

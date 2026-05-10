# ADR-0016: 디자인 시스템 — Wanted DS 베이스 + 베이커리 캐러멜 톤

상태: 채택
일자: 2026-05-05

## 컨텍스트

ADR-0003에서 기술 스택을 정했으나 디자인 토큰(색·타이포·간격·라운드·섀도)은 임시로 추정한 카라멜 팔레트(`#5B3A24`)만 잡아 둔 상태였다. 1인 운영자가 디자인까지 내부에서 만들기엔 시간 부담이 크다.

사용자가 Claude Design (claude.ai/design)으로 별도로 디자인 시스템을 iterate해서 만들었고 (`docs/design/` 보존), 이를 기준으로 채택할지 결정해야 한다.

제약:
- 1인 운영 — 디자인 토큰 일관성 강제하는 단일 진실 원천 필요
- 베이커리·디저트 1차 GTM — 도메인 친화 톤 필수
- 폰트·아이콘 라이선스 안전 (MIT/OFL)
- 다른 ADR 결정과 정합성 (Tailwind v3, NativeWind v4, shadcn/ui, react-native-reusables)
- 추후 PMF 후 디자이너 합류 시 기준이 될 수 있어야 함

## 검토한 옵션

| 옵션 | 베타 시간 부담 | 일관성 | 도메인 적합 | 라이선스 |
|---|---|---|---|---|
| **A. Claude Design 산출물 채택** (Wanted DS 기반 + 캐러멜 #E8761A) | 🟢 0 (이미 만들어짐) | 🟢 (Wanted DS 검증) | 🟢 베이커리 톤 직접 | 🟢 CC BY 4.0 + OFL |
| B. 어제 ADR 임시 토큰 유지 (#5B3A24) | 🟡 추가 컴포넌트·미리보기 직접 만들어야 | 🟡 토큰만 있고 시스템 없음 | 🟡 추정 | 🟢 |
| C. shadcn/ui 디폴트 그대로 | 🟢 0 | 🟢 | 🔴 베이커리 톤 X | 🟢 MIT |
| D. 디자이너 외주 ($300-500) | 🔴 1-2주 | 🟢 | 🟢 | 🟢 |

## 결정

**옵션 A 채택.** `docs/design/` 의 디자인 시스템을 온스케줄의 공식 디자인 시스템으로 채택.

### 채택 범위

| 영역 | 채택 내용 |
|---|---|
| **브랜드 색** | `brand.500 #E8761A` (캐러멜) — Wanted DS의 cool gray 위에 따뜻한 액센트 |
| **타이포** | Pretendard JP (본문) + Wanted Sans (디스플레이·숫자) + JetBrains Mono (코드) |
| **시멘틱 색** | `bg.primary/secondary/tertiary/inverse/hero`, `fg.primary/secondary/tertiary/quaternary`, `line.subtle/normal/strong` |
| **도메인 시멘틱 색** | confirmed=green / pending=amber / noshow=red / cancelled=neutral |
| **간격** | 4px base (Wanted DS canonical) |
| **라운드** | xs/sm/md/lg/xl/2xl/pill (4/6/10/14/20/28/9999) |
| **섀도** | 4단계 + focus (캐러멜 톤 3px alpha 28%) |
| **모션** | ease-standard / ease-emphasized + dur 120/200/320ms |
| **아이콘** | Lucide Icons (24px, stroke 1.75) |
| **콘텐츠 톤** | 사장님 친화 + Painkiller 어휘, 이모지 인터페이스 사용 X |
| **인칭/호칭** | 사장님 화면 = 사장님("나"), 시스템 = 존댓말("예약이 들어왔어요") |

### 코드 반영 (즉시)

| 파일 | 변경 |
|---|---|
| `tooling/tailwind/colors.ts` | 디자인 시스템 색 팔레트 전면 채택 |
| `tooling/tailwind/theme.ts` | 타이포·간격·라운드·섀도·모션 토큰 추가 |
| `tooling/tailwind/web.ts` | shadcn/ui CSS 변수 매핑 (브랜드 캐러멜 HSL) |
| `tooling/tailwind/native.ts` | 모바일 토큰 + Native Tabs 색 보정 |
| `tooling/tailwind/globals.css` | 폰트 import + HSL 변수 + 타이포 utility 클래스 |
| `tooling/tailwind/README.md` | 정책·사용법·레퍼런스 |

### 원본 보존
- `docs/design/` — Claude Design 산출물 + chat transcript 그대로 보존
- 향후 추가 화면·컴포넌트 만들 때 `docs/design/project/preview/`, `docs/design/project/ui_kits/` 참조

## 근거

### Claude Design 산출물 채택 사유
1. **이미 완성된 작업**: 사용자가 직접 iterate한 결과물 — 별도 디자인 시간 0
2. **Wanted DS 베이스**: 검증된 한국 디자인 시스템 (Wanted 직업 플랫폼) — CC BY 4.0
3. **도메인 적합**: 베이커리·디저트의 따뜻한 캐러멜(#E8761A) 톤 직접 표현 (구움색)
4. **시스템적 완결성**: 색·타이포·간격·라운드·섀도·모션·아이콘·인터랙션·카피 톤까지 모두 정의됨
5. **라이선스 안전**: 모든 폰트(Pretendard JP, Wanted Sans, JetBrains Mono) OFL, 아이콘(Lucide) MIT
6. **클로드 코드 친화**: 디자인 시스템 CSS 변수가 표준 패턴이라 클로드가 빠르게 읽고 적용 가능

### 어제 임시 결정(#5B3A24) 폐기 사유
- 빠른 추론으로 정한 색이었고, 디자인 시스템은 더 신중한 선택 (Wanted DS 베이스 + iterate)
- `#5B3A24`는 너무 어두운 에스프레소 톤 → "구움색" 정서 약함
- `#E8761A`는 빵·캐러멜·호박파이를 직접 떠올리게 함

### shadcn/ui 디폴트 비채택 사유
- 베이커리 도메인 톤 표현 못함 (블루·바이올렛 위주)
- 디자인 시스템과 쉽게 호환되어야 하는데 색 충돌

### 디자이너 외주 비채택 사유
- 베타 단계 비용 우선
- Claude Design 산출물이 이미 외주급 품질
- PMF 후 정식 디자이너 합류 시 이 시스템을 baseline으로 활용

## 결과

### 즉시 액션 (완료)
- [x] `docs/design/` 원본 보존
- [x] `tooling/tailwind/*` 전면 갱신 (5개 파일)
- [x] ADR-0003 기술 스택에 디자인 시스템·폰트·아이콘 명시

### 후속 액션
- [ ] `apps/web` 생성 시 `globals.css` import + 디자인 시스템 미리보기 카드 1차 적용
- [ ] `apps/mobile` 생성 시 Pretendard JP 로컬 번들 (CDN 안 됨) — react-native-pretendard 등
- [ ] `docs/design/project/landing/index.html` → Next.js + shadcn/ui 패턴으로 변환 (랜딩 페이지)
- [ ] `docs/design/project/ui_kits/owner/components.jsx` → React 컴포넌트로 추출 (사장님 대시보드)
- [ ] `docs/design/project/ui_kits/customer/components.jsx` → 모바일 화면 추출 (Expo 사장님 앱은 별개, 이건 고객 모바일 웹)

### 제거된 결정
- 어제 ADR-0003 갱신 시 추가했던 임시 카라멜 팔레트 (`#5B3A24` 등) → 이 ADR로 대체됨

### 디자인 시스템 안에 있는 잔재 ("예약톡" 이름)
- 디자인 시스템 안의 코드·문서는 "예약톡" 이름으로 만들어졌으나 (chat transcript 참조), ADR-0001/메모리에서 결정된 공식 이름은 **"온스케줄"**
- 디자인 시스템 토큰·정책·시멘틱은 이름과 무관하게 그대로 채택
- `docs/design/` 안의 텍스트는 원본 보존 (참조용), 우리 코드(tooling/tailwind, ADR)에선 "온스케줄"로 통일
- 추후 디자인 시스템에서 컴포넌트 추출 시 텍스트만 "온스케줄"로 치환

## 라이선스 / 출처 정리

| 자산 | 라이선스 | 출처 |
|---|---|---|
| Wanted Design System | CC BY 4.0 | Wanted Lab — claude design 안에서 참조 |
| Pretendard JP | SIL OFL 1.1 | https://github.com/orioncactus/pretendard |
| Wanted Sans | SIL OFL 1.1 | https://github.com/wanteddev/wanted-sans |
| JetBrains Mono | SIL OFL 1.1 | https://www.jetbrains.com/lp/mono/ |
| Lucide Icons | MIT | https://lucide.dev |

→ 베타·상용 모두 안전. 별도 표시 의무 없음 (다만 Wanted DS는 CC BY로 디자인 크레딧 푸터에 명시 권장).

## 재검토 트리거

- 사용자가 디자인 톤 다른 방향 시도하고 싶을 때 (예: 다크 초콜릿, 분홍 베이지, 민트 + 베이지 — chat에서 옵션 제안된 적 있음)
- PMF 후 디자이너 합류 → 기존 시스템 유지/리뉴얼 결정
- 글로벌 확장 시 한국어 외 언어 폰트 추가 (현재 Pretendard JP가 일·영 커버)
- 접근성(WCAG AAA) 강화 필요 시 — 일부 시멘틱 색의 대비 재검토

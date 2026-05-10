---
name: yeyaktok-design
description: Use this skill to generate well-branded interfaces and assets for 예약톡 (YeyakTok) — a Korean reservation & no-show management SaaS for small bakery / dessert shops. Contains design tokens (warm caramel + cool neutral palette, Pretendard JP type), Korean copy tone guidelines, domain semantics (confirmed / pending / noshow / cancelled), and UI kits for both the owner web dashboard and the customer mobile reservation page. Use for production designs, throwaway prototypes, slide mockups, or sample screens.
user-invocable: true
---

# 예약톡 Design System Skill

Read `README.md` first — it has the full visual + content fundamentals, the source provenance (Wanted Design System base + this service's planning docs), and an index of every other file in this skill.

## What's here
- `colors_and_type.css` — every design token (color, type, spacing, radius, shadow, motion). Import this first when building anything.
- `assets/` — logo, mark, and an empty-state illustration. Copy out before referencing.
- `preview/*.html` — small specimen cards (logo, color scales, type, spacing, components). Inspect for exact rendered values.
- `ui_kits/owner/` — desktop dashboard kit (Sidebar, Topbar, KpiRow, ReservationCard, AlimtalkModal). `index.html` is a clickable demo; `components.jsx` is the source of truth.
- `ui_kits/customer/` — mobile reservation page kit (StoreHeader, StepBar, MenuItem, TimeSlot, Summary, FixedBottom, SuccessScreen). 390px width.
- `docs/` — original planning docs (Korean) for context on the service domain.

## How to use
- For visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need into your output folder and write static HTML referencing `colors_and_type.css` plus the relevant kit components. Don't hand-roll new tokens.
- For production code, lift the CSS variables from `colors_and_type.css` into the codebase's token system. The component JSX in `ui_kits/` is reference-grade — re-implement using the host project's framework + styling, but match the exact spacing/radius/color/type values.
- All Korean copy in this skill follows the tone in README §2 — short, factual, painkiller vocabulary, no emoji in UI chrome (only in placeholder content). Match it.
- Domain semantics are non-negotiable: confirmed=green, pending=amber, noshow=red, cancelled=neutral. Caramel `#E8761A` is brand only — never use it as a status color.

## If invoked without context
Ask: "어떤 화면/자산을 만드시겠어요? (사장님 대시보드 / 고객 예약 페이지 / 슬라이드 / 마케팅 페이지 / 다른 것)" Then ask 3-5 clarifying questions about scope, fidelity, and which existing kit screens to extend. Output HTML artifacts unless explicitly asked for production code.

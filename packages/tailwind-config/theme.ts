/**
 * Tailwind theme.extend 공통 객체
 *
 * 출처: docs/design/project/colors_and_type.css
 * web/native preset 모두에서 import.
 */

import { colors } from './colors';

/**
 * Tailwind v3 fontSize 항목 형식:
 *   [fontSize, { lineHeight, letterSpacing?, fontWeight }]
 */
type FontSizeEntry = [
  string,
  { lineHeight: string; letterSpacing?: string; fontWeight: string },
];

export const sharedTheme = {
  // ─────────────────────────────────────────────────────────
  // Colors
  // ─────────────────────────────────────────────────────────
  colors: {
    neutral: colors.neutral,
    brand: colors.brand,
    cream: colors.cream,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,

    // Status (도메인 시멘틱)
    confirmed: colors.status.confirmed,
    pending: colors.status.pending,
    noshow: colors.status.noshow,
    cancelled: colors.status.cancelled,
  },

  // ─────────────────────────────────────────────────────────
  // Typography (Pretendard JP + Wanted Sans + JetBrains Mono)
  // ─────────────────────────────────────────────────────────
  fontFamily: {
    sans: [
      'Pretendard JP',
      'Pretendard Variable',
      'Pretendard',
      '-apple-system',
      'Apple SD Gothic Neo',
      'Helvetica Neue',
      'Noto Sans KR',
      'system-ui',
      'sans-serif',
    ],
    display: [
      'Wanted Sans Variable',
      'Wanted Sans',
      'Pretendard JP',
      'Pretendard',
      'system-ui',
      'sans-serif',
    ],
    mono: [
      'JetBrains Mono',
      'SF Mono',
      'Roboto Mono',
      'Menlo',
      'Consolas',
      'monospace',
    ],
  },

  fontSize: {
    // Display (히어로·대형 숫자)
    'display-1': ['56px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }] as FontSizeEntry,
    'display-2': ['40px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '700' }] as FontSizeEntry,

    // Title
    'h1': ['36px', { lineHeight: '1.334', letterSpacing: '-0.027em', fontWeight: '700' }] as FontSizeEntry,
    'h2': ['28px', { lineHeight: '1.358', letterSpacing: '-0.024em', fontWeight: '700' }] as FontSizeEntry,
    'h3': ['24px', { lineHeight: '1.4', letterSpacing: '-0.020em', fontWeight: '700' }] as FontSizeEntry,
    'h4': ['20px', { lineHeight: '1.4', letterSpacing: '-0.014em', fontWeight: '600' }] as FontSizeEntry,

    // Body
    'body-l': ['18px', { lineHeight: '1.555', letterSpacing: '0.004em', fontWeight: '500' }] as FontSizeEntry,
    'body': ['16px', { lineHeight: '1.5', letterSpacing: '0.006em', fontWeight: '500' }] as FontSizeEntry,
    'body-s': ['14px', { lineHeight: '1.428', letterSpacing: '0.011em', fontWeight: '500' }] as FontSizeEntry,

    // Label
    'label-l': ['16px', { lineHeight: '1.5', fontWeight: '600' }] as FontSizeEntry,
    'label': ['14px', { lineHeight: '1.428', fontWeight: '600' }] as FontSizeEntry,
    'label-s': ['12px', { lineHeight: '1.333', fontWeight: '600' }] as FontSizeEntry,

    // Caption / small
    'caption': ['12px', { lineHeight: '1.333', letterSpacing: '0.025em', fontWeight: '500' }] as FontSizeEntry,

    // Numerals (가격, KPI, 시간 — tabular-nums 적용)
    'numeral-l': ['32px', { lineHeight: '1.2', fontWeight: '700' }] as FontSizeEntry,
    'numeral': ['20px', { lineHeight: '1.2', fontWeight: '700' }] as FontSizeEntry,

    // Code
    'code': ['13px', { lineHeight: '1.5', fontWeight: '500' }] as FontSizeEntry,
  },

  // ─────────────────────────────────────────────────────────
  // Spacing (4px base — Wanted DS canonical)
  // ─────────────────────────────────────────────────────────
  spacing: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
  },

  // ─────────────────────────────────────────────────────────
  // Border Radius
  // ─────────────────────────────────────────────────────────
  borderRadius: {
    DEFAULT: '10px',
    none: '0',
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    '2xl': '28px',
    pill: '9999px',
    full: '9999px',
  },

  // ─────────────────────────────────────────────────────────
  // Box Shadow (4 단계 + focus, 디자인 시스템 §3.5)
  // ─────────────────────────────────────────────────────────
  boxShadow: {
    '1': '0 1px 2px rgba(23,23,25,0.06), 0 0 1px rgba(23,23,25,0.04)',
    '2': '0 2px 6px rgba(23,23,25,0.07), 0 0 1px rgba(23,23,25,0.04)',
    '3': '0 6px 20px rgba(23,23,25,0.10), 0 1px 2px rgba(23,23,25,0.06)',
    '4': '0 16px 40px rgba(23,23,25,0.12), 0 2px 6px rgba(23,23,25,0.06)',
    focus: '0 0 0 3px rgba(232,118,26,0.28)', // 캐러멜 톤 포커스 링
  },

  // ─────────────────────────────────────────────────────────
  // Transition (디자인 시스템 §3.7)
  // ─────────────────────────────────────────────────────────
  transitionTimingFunction: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
  },
  transitionDuration: {
    '1': '120ms', // hover
    '2': '200ms', // 일반
    '3': '320ms', // 모달·시트
  },
};

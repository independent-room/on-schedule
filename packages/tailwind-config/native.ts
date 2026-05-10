/**
 * Tailwind v3 + NativeWind v4 preset — apps/mobile (Expo SDK 53)
 *
 * 디자인 시스템 토큰 (docs/design/project/colors_and_type.css) 기반.
 * 모바일은 ui_kits/customer/ 의 customer 키트가 우선 (390px 가정).
 *
 * Native Tabs 색 보정 (ADR-0011) 포함.
 */

import type { Config } from 'tailwindcss';
import { sharedTheme } from './theme';
import { colors } from './colors';

const preset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...sharedTheme.colors,

        // 모바일 직접 사용 색 (CSS 변수 안 거침)
        background: colors.bg.primary,
        surface: colors.neutral[0],
        'surface-subtle': colors.neutral[50],
        border: colors.neutral[200],
        'border-strong': colors.neutral[400],

        // Text colors (RN <Text>는 별도 클래스 필요)
        'text-primary': colors.neutral[1000],   // 모바일은 alpha 대신 고정 (RN 호환)
        'text-secondary': colors.neutral[800],
        'text-tertiary': colors.neutral[700],
        'text-muted': colors.neutral[600],

        // Native Tabs 색 보정 (ADR-0011 — Material 3 알약 인디케이터 시각 노이즈 완화)
        'tab-active': colors.brand[500],
        'tab-inactive': colors.neutral[600],
        'tab-indicator': colors.brand[100],
      },
      fontFamily: sharedTheme.fontFamily,
      fontSize: sharedTheme.fontSize,
      borderRadius: sharedTheme.borderRadius,
      boxShadow: sharedTheme.boxShadow,
    },
  },
};

export default preset;

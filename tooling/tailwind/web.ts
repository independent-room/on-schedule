/**
 * Tailwind v3 preset — apps/web (Next.js 15 + shadcn/ui)
 *
 * 디자인 시스템 토큰 (docs/design/project/colors_and_type.css) 기반.
 * shadcn/ui CSS 변수 매핑 포함 (globals.css 참조).
 */

import type { Config } from 'tailwindcss';
import { sharedTheme } from './theme';

const preset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        ...sharedTheme.colors,

        // shadcn/ui 호환 — globals.css의 CSS 변수와 매핑
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontFamily: sharedTheme.fontFamily,
      fontSize: sharedTheme.fontSize,
      borderRadius: {
        ...sharedTheme.borderRadius,
        // shadcn/ui --radius 호환
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: sharedTheme.boxShadow,
      transitionTimingFunction: sharedTheme.transitionTimingFunction,
      transitionDuration: sharedTheme.transitionDuration,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms cubic-bezier(0.2, 0, 0, 1)',
        'accordion-up': 'accordion-up 200ms cubic-bezier(0.2, 0, 0, 1)',
        'fade-up': 'fade-up 200ms cubic-bezier(0.2, 0, 0, 1)',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
};

export default preset;

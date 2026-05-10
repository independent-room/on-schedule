import preset from '@on-schedule/tailwind-config/web';
import type { Config } from 'tailwindcss';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

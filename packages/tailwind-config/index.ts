/**
 * @on-schedule/tailwind-config
 *
 * 진입점은 플랫폼별로 분리되어 있음:
 *   import preset from '@on-schedule/tailwind-config/web';     // Next.js
 *   import preset from '@on-schedule/tailwind-config/native';  // Expo
 *
 * 비-Tailwind 영역(알림톡 템플릿·마케팅 자료·StyleSheet 등)에서 토큰만 필요할 때:
 *   import { colors } from '@on-schedule/tailwind-config/colors';
 */

export { colors } from './colors';
export { sharedTheme } from './theme';

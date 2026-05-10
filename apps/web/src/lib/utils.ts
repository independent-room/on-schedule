import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 유틸 (shadcn/ui 표준 패턴)
 * - clsx로 조건부 클래스 정리
 * - tailwind-merge로 충돌 해결 (뒤의 것이 이김)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Resend } from 'resend';

// Resend API key는 onschedule.kr (root) 도메인에만 권한.
// 검증 단계엔 root 도메인으로 hardcode (PMF 후 multi-domain 시 env로 복원).
export const RESEND_FROM = 'contact@onschedule.kr';
export const RESEND_REPLY_TO = 'contact@onschedule.kr';

let cached: Resend | null = null;

export function getResendClient(): Resend {
  if (cached) return cached;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing RESEND_API_KEY env. apps/web/.env.local 확인 (Bitwarden Secure Note 참조).',
    );
  }

  cached = new Resend(apiKey);
  return cached;
}

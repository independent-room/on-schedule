import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error(
    'Missing RESEND_API_KEY env. apps/web/.env.local 확인 (Bitwarden Secure Note 참조).',
  );
}

export const resend = new Resend(apiKey);

export const RESEND_FROM = process.env.RESEND_FROM_EMAIL ?? 'contact@send.onschedule.kr';
export const RESEND_REPLY_TO = process.env.RESEND_REPLY_TO ?? 'contact@onschedule.kr';

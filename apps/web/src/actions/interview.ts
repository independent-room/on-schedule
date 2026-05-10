'use server';

import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';

export type InterviewResult =
  | { ok: true }
  | { ok: false; code: 'validation' | 'not_found' | 'database'; error: string };

const inputSchema = z.object({
  email: z.string().email(),
});

// 인터뷰 신청 = 동의 플래그 update만. 자동 메일은 보내지 않음
// (곧 운영자가 직접 일정 조율 메일을 보낼 거라 중복·노이즈가 됨).
// thank-you 페이지의 InterviewOptIn 카드가 이미 "며칠 안에 일정 조율 메일 드립니다" 약속하니 충분.
export async function requestInterview(input: { email: string }): Promise<InterviewResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: 'validation', error: '이메일 형식이 올바르지 않습니다' };
  }

  const { data, error: dbError } = await getSupabaseAdmin()
    .from('waitlist')
    .update({ interview_consent: true })
    .eq('email', parsed.data.email)
    .select('email, interview_consent')
    .maybeSingle();

  if (dbError) {
    console.error('[interview] supabase update failed:', dbError);
    return { ok: false, code: 'database', error: '저장 실패. 잠시 후 다시 시도해주세요' };
  }
  if (!data) {
    return {
      ok: false,
      code: 'not_found',
      error: '사전 신청 기록이 없습니다. 먼저 사전 신청부터 해주세요',
    };
  }

  return { ok: true };
}

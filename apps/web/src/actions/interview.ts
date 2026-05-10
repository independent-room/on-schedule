'use server';

import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { resend, RESEND_FROM, RESEND_REPLY_TO } from '@/lib/resend';

export type InterviewResult =
  | { ok: true }
  | { ok: false; code: 'validation' | 'not_found' | 'database' | 'mail'; error: string };

const inputSchema = z.object({
  email: z.string().email(),
});

export async function requestInterview(input: { email: string }): Promise<InterviewResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: 'validation', error: '이메일 형식이 올바르지 않습니다' };
  }

  const { data, error: dbError } = await supabaseAdmin
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

  // 인터뷰 안내 메일 (실패해도 update는 성공으로 처리)
  try {
    const { error: mailError } = await resend.emails.send({
      from: RESEND_FROM,
      replyTo: RESEND_REPLY_TO,
      to: parsed.data.email,
      subject: '[온스케줄] 인터뷰 참여 신청 감사합니다 — 곧 일정 조율 메일 드릴게요',
      html: `
<div style="font-family:'Pretendard JP',Pretendard,system-ui,sans-serif;max-width:520px;line-height:1.6;color:#17171A">
  <h2 style="font-size:22px;font-weight:800;margin:0 0 16px;color:#E8761A">인터뷰 참여 신청 완료</h2>
  <p>사장님, 인터뷰에 동참해주셔서 감사합니다.</p>
  <p>며칠 안에 일정 조율 메일을 드리겠습니다. 사장님 가게가 가장 한가한 시간대 알려주시면 거기에 맞춰 진행해드릴게요.</p>
  <p style="margin-top:24px;padding:16px;background:#FFF4EA;border-radius:12px;color:#7A4A18">
    <strong>약속드린 혜택</strong><br/>
    인터뷰 참여 시 정식 출시 후 <strong>추가 1개월 무료</strong>를 드립니다.
    (사전 신청 기본 3개월 + 인터뷰 1개월 = 총 4개월 무료)
  </p>
  <p style="margin-top:32px;color:#70737C;font-size:13px">— 인디펜던트룸 · 온스케줄</p>
</div>
`.trim(),
    });
    if (mailError) console.error('[interview] Resend returned error:', mailError);
  } catch (mailErr) {
    console.error('[interview] Resend threw:', mailErr);
  }

  return { ok: true };
}

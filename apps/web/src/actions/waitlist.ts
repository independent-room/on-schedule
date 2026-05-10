'use server';

import { headers } from 'next/headers';
import { createHash } from 'node:crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { resend, RESEND_FROM, RESEND_REPLY_TO } from '@/lib/resend';
import { waitlistInputSchema, type WaitlistInput } from '@/lib/schemas/waitlist';

export type WaitlistResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code: 'validation' | 'duplicate' | 'database' | 'mail';
    };

export async function submitWaitlist(input: WaitlistInput): Promise<WaitlistResult> {
  const parsed = waitlistInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: 'validation',
      error: '입력 형식이 올바르지 않습니다',
    };
  }
  const data = parsed.data;

  const h = await headers();
  const rawIp =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    'unknown';
  const ipHash = createHash('sha256').update(rawIp).digest('hex').slice(0, 16);

  const { error: dbError } = await supabaseAdmin.from('waitlist').insert({
    email: data.email,
    industry: data.industry,
    phone: data.phone ?? null,
    privacy_consent: data.privacy_consent,
    marketing_consent: data.marketing_consent,
    interview_consent: data.interview_consent ?? false,
    user_agent: h.get('user-agent'),
    ip_hash: ipHash,
  });

  if (dbError) {
    if (dbError.code === '23505') {
      return {
        ok: false,
        code: 'duplicate',
        error: '이미 사전 신청하신 이메일입니다',
      };
    }
    console.error('[waitlist] supabase insert failed:', dbError);
    return {
      ok: false,
      code: 'database',
      error: '신청 저장에 실패했어요. 잠시 후 다시 시도해주세요',
    };
  }

  // 자동 응답 메일 — 실패해도 신청 자체는 성공으로 처리 (메일은 부수효과).
  // Resend SDK는 throw하지 않고 { data, error } 반환하므로 error 필드를 명시적으로 체크.
  try {
    const { data: sent, error: mailError } = await resend.emails.send({
      from: RESEND_FROM,
      replyTo: RESEND_REPLY_TO,
      to: data.email,
      subject: '[온스케줄] 사전 신청 감사합니다 — 1순위로 안내드릴게요',
      html: buildWelcomeEmail({ interview: data.interview_consent ?? false }),
    });
    if (mailError) {
      console.error('[waitlist] Resend returned error:', mailError);
    } else {
      console.log('[waitlist] Resend mail sent:', sent?.id);
    }
  } catch (mailErr) {
    console.error('[waitlist] Resend threw:', mailErr);
  }

  return { ok: true };
}

function buildWelcomeEmail(opts: { interview: boolean }): string {
  const interviewBlock = opts.interview
    ? `<p>인터뷰에 동참해주셔서 감사합니다. 곧 일정 조율 메일을 별도로 드릴게요.</p>`
    : `<p>혹시 10분만 통화 가능하시면 더 좋은 서비스를 만드는 데 큰 도움이 됩니다.<br/>회신해주시면 일정 조율 드릴게요. (참여 시 추가 1개월 무료)</p>`;

  return `
<div style="font-family:'Pretendard JP',Pretendard,system-ui,sans-serif;max-width:520px;line-height:1.6;color:#17171A">
  <h2 style="font-size:22px;font-weight:800;margin:0 0 16px;color:#E8761A">사전 신청이 완료됐습니다</h2>
  <p>사장님, 온스케줄 사전 신청을 해주셔서 감사합니다.</p>
  <p>출시되면 <strong>1순위로 초대 메일</strong>을 보내드릴게요. 약속드린 혜택도 잊지 않고 챙기겠습니다:</p>
  <ul>
    <li>출시 후 3개월 무료</li>
    <li>오픈 전 미리 사용</li>
    <li>평생 회원가 보장</li>
  </ul>
  ${interviewBlock}
  <p style="margin-top:32px;color:#70737C;font-size:13px">— 인디펜던트룸 · 온스케줄</p>
</div>
`.trim();
}

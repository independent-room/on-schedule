'use client';

import { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { Button } from '@on-schedule/ui/components/ui/button';
import { requestInterview } from '@/actions/interview';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function InterviewOptIn({ email }: { email: string | null }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleClick() {
    if (!email) {
      setStatus('error');
      setErrorMsg('이메일 정보가 없어 신청할 수 없습니다. 사전 신청부터 다시 해주세요.');
      return;
    }
    setStatus('submitting');
    const result = await requestInterview({ email });
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-success-500/30 bg-success-500/5 p-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-500 text-white">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <p
          className="mb-2 text-h4 text-foreground font-display font-bold"
        >
          인터뷰 참여 신청 완료
        </p>
        <p className="text-body-s text-neutral-700">
          며칠 안에 <strong>contact@onschedule.kr</strong>에서 일정 조율 메일 드립니다.
          <br />
          정식 출시 후 추가 <strong className="text-brand-700">1개월 무료</strong> 적용됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-500/30 bg-cream-50/40 p-7 text-left">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <p
          className="text-h4 text-foreground font-display font-bold"
        >
          인터뷰 참여 시 <span className="text-brand-700">추가 1개월 무료</span>
        </p>
      </div>
      <p className="mb-5 text-body text-neutral-700">
        사장님 의견을 직접 듣고 더 좋은 서비스를 만들고 싶습니다.
        <br />
        간단한 통화 또는 메시지 인터뷰로 사장님 가게 운영 이야기를 들려주세요.
      </p>
      <Button
        onClick={handleClick}
        disabled={status === 'submitting' || !email}
        className="h-12 w-full bg-brand-500 text-[15px] font-bold text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {status === 'submitting' ? '신청 중…' : '인터뷰 참여 신청 →'}
      </Button>
      {status === 'error' && (
        <p className="mt-3 text-body-s text-destructive">{errorMsg}</p>
      )}
    </div>
  );
}

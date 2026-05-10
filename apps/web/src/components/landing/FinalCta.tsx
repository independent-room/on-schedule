'use client';

import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';

export function FinalCta() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="signup"
      className="bg-neutral-1000 px-6 py-28 text-cream-100"
    >
      <div className="mx-auto max-w-[680px] text-center">
        <span
          className="mb-[18px] inline-block rounded-pill bg-brand-500 px-3 py-[5px] text-[12px] font-bold text-white"
          style={{ letterSpacing: '0.02em' }}
        >
          베타 3개월 무료
        </span>
        <h2
          className="mb-5"
          style={{
            fontFamily: 'Wanted Sans Variable, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.16,
            letterSpacing: '-0.030em',
            color: '#F4ECDC',
            textWrap: 'pretty',
          }}
        >
          노쇼 없이 빵 굽기, 시작해 볼까요?
        </h2>
        <p
          className="mx-auto mb-10 max-w-[480px]"
          style={{
            fontWeight: 500,
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'rgba(244, 236, 220, 0.74)',
          }}
        >
          이메일만 남겨두시면 베타 초대 메일 보내드려요. 1분이면 끝.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[460px] gap-2"
          >
            <input
              type="email"
              inputMode="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              className="h-[60px] flex-1 rounded-lg border-[1.5px] border-neutral-800 bg-neutral-950 px-[18px] text-[16px] font-medium text-cream-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-brand-500"
            />
            <button
              type="submit"
              className="h-[60px] rounded-lg bg-brand-500 px-[30px] text-[17px] font-bold text-white transition-all hover:-translate-y-px hover:bg-brand-600"
            >
              사전 신청
            </button>
          </form>
        ) : (
          <div className="mx-auto flex max-w-[460px] items-center justify-center gap-3 rounded-lg border-2 border-brand-500 bg-neutral-900 px-5 py-5 text-cream-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
              <Check size={18} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="text-[14px] font-bold">사전 신청 완료</div>
              <div className="text-[13px] opacity-70">{email}</div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-[18px] text-[13px] font-medium opacity-70">
          <span className="inline-flex items-center gap-1.5">
            <Check size={14} strokeWidth={3} />
            카드 등록 X
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={14} strokeWidth={3} />
            언제든 취소
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={14} strokeWidth={3} />
            스팸 0
          </span>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { Cake, Check } from 'lucide-react';

export function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: Tally / Supabase 연결 (베타 단계엔 mock)
    setSubmitted(true);
  }

  return (
    <section className="hero-glow relative overflow-hidden px-6 py-[88px] lg:py-24">
      <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[60px]">
        {/* LEFT: 카피 + 폼 */}
        <div>
          {/* Pill */}
          <div
            className="mb-6 inline-flex items-center gap-[7px] rounded-pill bg-brand-100 px-[14px] py-[7px] text-[12px] font-bold text-brand-800"
            style={{ letterSpacing: '0.01em' }}
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" />
            사장님 47분과 함께 만들었어요
          </div>

          {/* Headline */}
          <h1
            className="mb-[22px] text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 64px)',
              lineHeight: 1.08,
              letterSpacing: '-0.036em',
              textWrap: 'pretty',
            }}
          >
            노쇼는 <em className="text-highlight not-italic">0건</em>으로,
            <br />
            수수료는 <em className="text-highlight not-italic">1/9</em>로.
          </h1>

          {/* Lede */}
          <p
            className="mb-8 max-w-[480px] text-neutral-700"
            style={{
              fontWeight: 500,
              fontSize: '19px',
              lineHeight: 1.62,
              textWrap: 'pretty',
            }}
          >
            카톡 DM으로 받던 예약을 자동화하세요.{' '}
            <strong className="font-bold text-foreground">선결제로 노쇼 막고</strong>
            ,{' '}
            <strong className="font-bold text-foreground">알림톡으로 자동 안내</strong>.
            결제 수수료는 영세 가맹점 0.4%.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mb-3.5 flex max-w-[460px] gap-2">
              <input
                type="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
                className="h-[60px] flex-1 rounded-lg border-[1.5px] border-neutral-300 bg-white px-[18px] text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-neutral-600 focus:border-brand-500"
              />
              <button
                type="submit"
                className="h-[60px] rounded-lg bg-brand-500 px-[30px] text-[17px] font-bold text-white transition-all hover:-translate-y-px hover:bg-brand-600"
              >
                먼저 받아보기
              </button>
            </form>
          ) : (
            <div className="mb-3.5 flex max-w-[460px] items-center gap-3 rounded-lg border-2 border-success-500 bg-success-50 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-500 text-white">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-foreground">
                  사전 신청이 완료됐어요
                </div>
                <div className="text-[13px] text-neutral-700">{email}</div>
              </div>
            </div>
          )}

          {/* Microcopy */}
          <div className="mb-8 flex flex-wrap gap-[18px] text-[13px] font-medium text-neutral-700">
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success-500" strokeWidth={3} />
              1분이면 끝
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success-500" strokeWidth={3} />
              신용카드 X
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-success-500" strokeWidth={3} />
              베타 3개월 무료
            </span>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center gap-3.5 border-t border-line-subtle pt-7">
            <div className="flex">
              {[
                { bg: '#E8761A', initial: '우' },
                { bg: '#9A4708', initial: '레' },
                { bg: '#C75F0F', initial: '호' },
                { bg: '#F58330', initial: '꽃' },
              ].map((a, i) => (
                <div
                  key={i}
                  className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg-hero text-[13px] font-bold text-white first:ml-0"
                  style={{ background: a.bg }}
                >
                  {a.initial}
                </div>
              ))}
            </div>
            <div className="text-[13px] font-medium text-neutral-700">
              <span className="mr-1 inline-flex gap-px text-brand-500">
                ★★★★★
              </span>
              <strong className="font-extrabold text-foreground">147명</strong>의
              사장님이 신청 중
            </div>
          </div>
        </div>

        {/* RIGHT: 폰 목업 */}
        <PhoneMock />
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="phone-glow relative justify-self-center">
      <div className="relative w-[320px] rounded-[42px] bg-neutral-1000 p-2.5 shadow-4">
        <div className="min-h-[540px] rounded-[33px] bg-white px-4 py-5">
          {/* 폰 헤더 */}
          <div className="flex items-center gap-2.5 border-b border-line-subtle pb-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-brand-100">
              <Cake size={22} className="text-brand-700" strokeWidth={1.75} />
            </div>
            <div>
              <div
                className="text-[15px] font-bold leading-tight text-foreground"
                style={{ fontFamily: 'Wanted Sans Variable, sans-serif' }}
              >
                베이커리 우진
              </div>
              <div className="mt-1 text-[11px] font-medium text-neutral-600">
                서울 마포구 · 평점 4.9
              </div>
            </div>
          </div>

          {/* 진행 단계 */}
          <div className="flex gap-1.5 pb-2 pt-3">
            <div className="h-[3px] flex-1 rounded-full bg-brand-500" />
            <div className="h-[3px] flex-1 rounded-full bg-brand-500" />
            <div className="h-[3px] flex-1 rounded-full bg-neutral-100" />
          </div>

          <div
            className="mb-3.5 mt-1.5 text-[17px] font-bold text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, sans-serif',
              letterSpacing: '-0.018em',
            }}
          >
            메뉴를 골라주세요
          </div>

          {/* 메뉴 아이템 (선택됨) */}
          <div className="mb-2 flex items-center gap-[11px] rounded-[10px] border-2 border-brand-500 bg-brand-50 p-[9px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-cream-200">
              <Cake size={22} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-foreground">
                레터링 케이크 (1호)
              </div>
              <div className="mt-1 text-[12px] font-bold text-brand-500 tabular-nums">
                42,000원
              </div>
            </div>
          </div>

          {/* 메뉴 아이템 */}
          <div className="mb-2 flex items-center gap-[11px] rounded-[10px] border border-line-subtle bg-white p-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-cream-200">
              <Cake size={22} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-foreground">
                딸기 쇼트케이크
              </div>
              <div className="mt-1 text-[12px] font-bold text-brand-500 tabular-nums">
                38,000원
              </div>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-[11px] rounded-[10px] border border-line-subtle bg-white p-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-cream-200">
              <Cake size={22} className="text-brand-700" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-foreground">
                바스크 치즈케이크
              </div>
              <div className="mt-1 text-[12px] font-bold text-brand-500 tabular-nums">
                35,000원
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-2.5 flex h-[46px] items-center justify-center rounded-[10px] bg-brand-500 text-[14px] font-bold text-white">
            다음으로
          </div>
        </div>
      </div>
    </div>
  );
}

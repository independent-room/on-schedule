'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  {
    q: '베타 3개월 무료, 정말 카드 등록 없이 바로 쓸 수 있나요?',
    a: '네. 사전 신청 → 베타 초대 메일 → 가게 페이지 셋업까지 카드 등록 0. 베타 3개월 동안 무료로 쓰시고, 본격 출시 시점에 월 3~5만원 구독 결제 안내드려요. 마음에 안 드시면 그냥 안 쓰시면 됩니다.',
  },
  {
    q: '카카오 알림톡, 우리 매장 카카오 채널 없어도 되나요?',
    a: '네. 매장 자체 채널 없으면 "[온스케줄] 알림" 같은 플랫폼 채널로 발송돼요. 카카오 비즈니스 채널 등록하시면 매장 자체 채널로 자동 전환됩니다. 채널 등록은 사장님이 직접 (3-7일 심사) 하시고요.',
  },
  {
    q: '네이버 예약·인스타 DM이랑 같이 쓸 수 있나요?',
    a: '네, 병행 가능해요. 우리는 우리 가게 페이지 링크만 추가로 제공하는 거고, 기존 채널은 그대로 두셔도 됩니다. 단 같은 시간대 중복 예약 방지는 안 돼요 (같은 가게라도 채널 분리). 베타 단계에선 우리 페이지 위주로 받으시는 걸 권합니다.',
  },
  {
    q: '노쇼 방지 진짜 효과 있나요?',
    a: '베타 5곳 평균 92% 감소 — 단 표본 작아 참고용. 핵심은 (1) 선결제로 자금이 잠겨 노쇼 자체 동기 ↓, (2) 노쇼 이력 누적·재예약 제한, (3) 알림톡 리마인드. 셋이 같이 작동해요. 100% 막진 못합니다.',
  },
  {
    q: '설치 같은 거 해야 하나요? 컴퓨터 잘 못 다루는데...',
    a: '아니요. 사장님은 폰 앱(iOS·Android) 또는 웹 콘솔에서 예약 확인하시면 됩니다. 손님 페이지는 웹이라 손님이 따로 설치할 거 없어요. 가게 페이지 셋업도 5분 안 걸립니다 (베타 사장님 평균 4분 23초).',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-50 px-6 py-28">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-[60px] text-center">
          <span
            className="mb-[18px] inline-block rounded-pill bg-brand-100 px-3 py-[5px] text-[12px] font-bold text-brand-800"
            style={{ letterSpacing: '0.02em' }}
          >
            자주 묻는 질문
          </span>
          <h2
            className="text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 44px)',
              lineHeight: 1.16,
              letterSpacing: '-0.030em',
            }}
          >
            궁금한 거, 미리 답해 드릴게요
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  'overflow-hidden rounded-[14px] border bg-white transition-all',
                  isOpen
                    ? 'border-brand-500 shadow-2'
                    : 'border-line-subtle'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cream-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-bold text-foreground">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <Minus
                      size={20}
                      className="shrink-0 text-brand-500"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Plus
                      size={20}
                      className="shrink-0 text-neutral-700"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
                {isOpen && (
                  <div
                    className="border-t border-line-subtle px-6 py-5 text-[15px] leading-relaxed text-neutral-700"
                    style={{ fontWeight: 500, lineHeight: 1.7 }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

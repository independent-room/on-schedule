'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@on-schedule/ui/lib/utils';
import { SectionHeading } from './SectionHeading';

type Item = { q: string; a: React.ReactNode };

const ITEMS: Item[] = [
  {
    q: '출시는 언제예요?',
    a: '2026년 하반기 MVP 출시 목표. 사전 신청자는 일반 오픈 전 1순위로 초대해드립니다.',
  },
  {
    q: '사전 신청하면 뭐가 달라져요?',
    a: (
      <>
        세 가지 약속드립니다: <strong>출시 후 3개월 무료</strong>, <strong>오픈 전 미리 사용</strong>, <strong>평생 회원가 보장</strong>(가격 인상 시에도 처음 가격 그대로).
      </>
    ),
  },
  {
    q: '지금 돈 내는 건가요?',
    a: '아닙니다. 사전 신청은 무료, 출시 후 유료 전환 시점에만 결제 안내드려요. 이메일·업종만 남겨주시면 됩니다.',
  },
  {
    q: '셋팅이 어렵지 않나요?',
    a: '단계별 셋업 위저드를 따라가시면 됩니다. 메뉴 → 시간 → 결제 → 알림까지 5분이면 끝나도록 설계했어요. 빈 화면에서 헤매는 일 없게 기본값을 미리 채워둡니다.',
  },
  {
    q: '알림톡 진짜 무제한인가요?',
    a: '예약 관련 알림(확정·리마인드·픽업 완료)은 무제한 포함. 마케팅 메시지(홍보·프로모션)는 별도 과금 — 추후 도입 예정.',
  },
  {
    q: '베이커리 외 업종도 되나요?',
    a: '시스템은 업종 불문 범용입니다. 베이커리·디저트·카페·뷰티·타투/반영구·원데이클래스 모두 가능. 사장님 가게 특성에 맞춰 단계별로 셋팅됩니다.',
  },
  {
    q: '개인정보는 안전한가요?',
    a: 'PIPA(개인정보보호법)을 준수합니다. 입력하신 이메일·전화번호는 출시 알림과 얼리버드 혜택 안내에만 사용하고, 제3자에게 절대 제공하지 않습니다.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-50/40 py-20 md:py-28">
      <div className="mx-auto max-w-[760px] px-6">
        <SectionHeading
          className="mb-12"
          eyebrow="자주 묻는 질문"
          title="궁금한 점 있으세요?"
        />

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white transition-all',
                  isOpen ? 'border-brand-500 shadow-2' : 'border-neutral-200',
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cream-50/60"
                  aria-expanded={isOpen}
                >
                  <span className="text-body-l font-bold text-foreground">{item.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={2.5} />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-neutral-700" strokeWidth={2.5} />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-100 px-6 py-5 text-body leading-relaxed text-neutral-700">
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

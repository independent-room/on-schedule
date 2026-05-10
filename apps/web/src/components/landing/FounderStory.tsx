import { Quote } from 'lucide-react';

export function FounderStory() {
  return (
    <section className="border-y border-neutral-200 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[820px] px-6">
        <div className="mb-8 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-brand-700">
            <Quote className="h-6 w-6" strokeWidth={1.75} />
          </div>
        </div>

        <h2
          className="mb-8 text-center text-h2 text-foreground md:text-[36px] font-display font-extrabold text-pretty"
        >
          예약 SaaS를 운영하며 직접 본 문제,
          <br />
          이번엔{' '}
          <span className="text-brand-500">다르게 풀어봅니다</span>.
        </h2>

        <div className="space-y-5 text-body-l leading-relaxed text-neutral-700">
          <p>
            <span className="font-bold text-foreground">지금예약</span>을
            운영하던 시절, 사장님들이 가장 답답해하시던 건
            <br className="hidden md:block" />
            <span className="font-bold text-foreground">
              {' '}
              '예약 도구가 너무 많고 복잡하다'
            </span>
            였습니다.
          </p>
          <p>
            이번엔 1인 부트스트랩으로 다시 시작합니다.
            <br />
            채널톡 + 예약 + CRM을 하나로,{' '}
            <span className="font-bold text-foreground">
              사장님이 5분 만에 셋팅
            </span>
            할 수 있게.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-body-s text-neutral-500">
          <span className="h-px w-12 bg-neutral-200" />
          창업자 이용민 · 인디펜던트룸
          <span className="h-px w-12 bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}

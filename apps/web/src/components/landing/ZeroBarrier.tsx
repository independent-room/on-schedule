import { X } from 'lucide-react';

const PAINS = ['복잡한 셋팅', '빈 화면', '헤매는 메뉴'];

const STEPS = ['메뉴', '시간', '결제', '알림', '완료'];

export function ZeroBarrier() {
  return (
    <section className="bg-cream-50/40 py-14 md:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-6 md:grid-cols-[0.95fr_1.05fr]">
        {/* 좌측: 메시지 */}
        <div>
          <div className="mb-5 flex flex-wrap gap-2">
            {PAINS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-body-s font-semibold text-neutral-700 line-through decoration-2"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>

          <h2
            className="mb-5 text-h2 text-foreground md:text-[36px] font-display font-extrabold text-balance break-keep"
          >
            <span className="whitespace-nowrap">복잡한 셋팅 NO!</span>{' '}
            <span className="text-brand-500 whitespace-nowrap">빈 화면 NO!</span>
          </h2>

          <p className="mb-3 text-h4 text-foreground font-bold">
            선택만 하셔도 바로 시작할 수 있어요
          </p>

          <p className="text-body-l text-neutral-700">
            어디서부터 시작할지 막막한 빈 화면,
            <br />
            "이거 어디서 설정하지?" 헤매는 메뉴는 이제 그만.
            <br />
            온스케줄은 단계만 따라가시면 누구나 5분 만에 시작할 수 있습니다.
          </p>
        </div>

        {/* 우측: 단계별 셋업 시각화 */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-2 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-wider text-brand-700">
              단계별 셋업 위저드
            </p>
            <p className="text-body-s text-neutral-700">
              <span className="font-bold text-foreground">3</span>
              <span className="text-neutral-500"> / 5</span>
            </p>
          </div>

          <div className="mb-6 flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < 3 ? 'bg-brand-500' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>

          <ol className="space-y-2.5">
            {STEPS.map((label, i) => {
              const done = i < 3;
              const active = i === 3;
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 ${
                    active
                      ? 'border-brand-500 bg-accent'
                      : done
                        ? 'border-neutral-200 bg-white'
                        : 'border-neutral-200 bg-neutral-50/50'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                      done
                        ? 'bg-success-500 text-white'
                        : active
                          ? 'bg-brand-500 text-white'
                          : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                  <span
                    className={`flex-1 text-body ${
                      active ? 'font-bold text-foreground' : 'text-neutral-700'
                    }`}
                  >
                    {label}
                  </span>
                  {active && (
                    <span className="text-[11px] font-bold text-brand-700">
                      진행 중
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

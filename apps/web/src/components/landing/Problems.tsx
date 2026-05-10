import { UserX, MessageSquare, CreditCard } from 'lucide-react';

const problems = [
  {
    icon: UserX,
    tag: '노쇼',
    title: '예약 부도, 매번 떠안으세요?',
    description:
      '오늘도 케이크 1개 만들었는데 손님이 안 오면 그대로 손실. 보증금 받기는 어색하고, 받아도 입금 확인이 번거로움.',
    stat: '44.3만원',
    label: '노쇼 1건당 평균 손실 (한국경제 2026.01)',
  },
  {
    icon: MessageSquare,
    tag: 'DM 관리',
    title: '카톡·인스타 DM, 매일 4분씩',
    description:
      '예약 확정·리마인드·픽업 안내까지 일일이 손으로 답장. 빵 굽다가 답장 늦으면 예약 놓침. 잠자리 들기 전 마지막 일.',
    stat: '4분/예약',
    label: '평균 DM 응답에 드는 시간 (베타 인터뷰)',
  },
  {
    icon: CreditCard,
    tag: '수수료',
    title: '네이버 예약 3.74%, 진짜 비싸요',
    description:
      '월 매출 500만원이면 18.7만원이 수수료로. 그것도 자동 확정이라 거절 못함. 30분 단위 시간만, 중복 예약 그대로.',
    stat: '월 18.7만원',
    label: '월 매출 500만원 기준 수수료 부담',
  },
];

export function Problems() {
  return (
    <section id="problems" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        {/* Head */}
        <div className="mb-[60px] text-center">
          <span
            className="mb-[18px] inline-block rounded-pill bg-brand-100 px-3 py-[5px] text-[12px] font-bold text-brand-800"
            style={{ letterSpacing: '0.02em' }}
          >
            왜 필요한가요
          </span>
          <h2
            className="mb-4 text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 44px)',
              lineHeight: 1.16,
              letterSpacing: '-0.030em',
              textWrap: 'pretty',
            }}
          >
            동네 사장님의 진짜 통증 3개
          </h2>
          <p
            className="mx-auto max-w-[600px] text-neutral-700"
            style={{
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: 1.6,
              textWrap: 'pretty',
            }}
          >
            검증된 통계와 베타 인터뷰에서 가장 자주 언급된 3가지.
            <br />
            온스케줄은 이 셋을 동시에 풀어요.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.tag}
                className="rounded-[18px] border border-line-subtle bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-2"
              >
                <div className="mb-[22px] flex items-center gap-[11px]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-brand-100">
                    <Icon size={22} className="text-brand-700" strokeWidth={1.75} />
                  </div>
                  <div className="rounded-pill bg-cream-50 px-[11px] py-1.5 text-[12px] font-bold text-brand-500">
                    {p.tag}
                  </div>
                </div>
                <h3
                  className="mb-2.5 text-foreground"
                  style={{
                    fontFamily: 'Wanted Sans Variable, sans-serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: 1.3,
                    letterSpacing: '-0.018em',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="mb-6 text-neutral-700"
                  style={{ fontWeight: 500, fontSize: '14px', lineHeight: 1.6 }}
                >
                  {p.description}
                </p>
                <div className="border-t border-line-subtle pt-5">
                  <div
                    className="text-brand-500 tabular-nums"
                    style={{
                      fontFamily: 'Wanted Sans Variable, sans-serif',
                      fontWeight: 800,
                      fontSize: '32px',
                      lineHeight: 1,
                      letterSpacing: '-0.024em',
                    }}
                  >
                    {p.stat}
                  </div>
                  <div className="mt-1.5 text-[12px] font-medium leading-none text-neutral-600">
                    {p.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

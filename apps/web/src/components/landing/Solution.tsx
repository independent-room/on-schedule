import { Calendar, CreditCard, MessageSquare } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Calendar,
    title: '예약 페이지 1분이면 끝',
    description:
      '메뉴·픽업 시간·일일 한도만 입력하면 가게 전용 예약 페이지가 생겨요. 카톡 채널·인스타 프로필 링크에 붙이세요.',
    takeaway: '→ 47분 사장님 평균 셋업 4분 23초',
  },
  {
    num: '02',
    icon: CreditCard,
    title: '선결제로 노쇼 0건',
    description:
      '메뉴 가격 전액 또는 보증금만 받기. 토스페이·카카오페이로 바로. 노쇼는 환불 안 돼요. 사장님은 입금 확인 안 해도 돼요.',
    takeaway: '→ 베타 사장님 평균 노쇼 92% 감소',
  },
  {
    num: '03',
    icon: MessageSquare,
    title: '알림톡이 알아서 안내',
    description:
      '예약 확정·전날 리마인드·픽업 준비완료까지 자동 발송. 차단된 손님은 SMS 자동 대체. 사장님 손 안 가요.',
    takeaway: '→ 사장님 하루 1시간 돌려받음',
  },
];

export function Solution() {
  return (
    <section
      id="solution"
      className="border-y border-line-subtle bg-cream-50 px-6 py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Head */}
        <div className="mb-[60px] text-center">
          <span
            className="mb-[18px] inline-block rounded-pill bg-brand-100 px-3 py-[5px] text-[12px] font-bold text-brand-800"
            style={{ letterSpacing: '0.02em' }}
          >
            어떻게 해결하나요
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
            세 단계로 끝
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
            셋업 5분, 그 다음부턴 사장님은 빵만 구우세요.
            <br />
            나머지는 시스템이 합니다.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex flex-col rounded-[18px] border border-line-subtle bg-white p-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-800"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 800,
                      fontSize: '16px',
                    }}
                  >
                    {step.num}
                  </div>
                  <Icon size={28} className="text-brand-500" strokeWidth={1.5} />
                </div>
                <h3
                  className="mb-3 text-foreground"
                  style={{
                    fontFamily: 'Wanted Sans Variable, sans-serif',
                    fontWeight: 800,
                    fontSize: '24px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.022em',
                    textWrap: 'pretty',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mb-5 flex-1 text-neutral-700"
                  style={{
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
                <div className="rounded-[10px] border border-line-subtle bg-cream-50 px-4 py-3 text-[13px] font-bold text-brand-700">
                  {step.takeaway}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

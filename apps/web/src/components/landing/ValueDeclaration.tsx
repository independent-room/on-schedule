import { Clock, Bell, Infinity as InfinityIcon } from 'lucide-react';

const POINTS = [
  {
    icon: Clock,
    title: '5분 만에 셋팅 완료',
    desc: '메뉴, 시간, 결제, 알림까지 단계별로',
  },
  {
    icon: Bell,
    title: '알림톡 무제한',
    desc: '예약 알림은 별도 충전·과금 없이 포함',
  },
  {
    icon: InfinityIcon,
    title: '사용량 제한 없음',
    desc: '예약 건수·고객 수 제한 0',
  },
];

export function ValueDeclaration() {
  return (
    <section className="border-y border-neutral-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-14 text-center">
          <h2 className="mb-4 font-display text-h2 font-extrabold text-foreground text-pretty md:text-[36px]">
            온스케줄로 사장님의 든든한 운영을 돕겠습니다
          </h2>
          <p className="mx-auto max-w-xl text-body-l text-neutral-700">
            예약 받기부터 알림톡 발송, 고객 관리까지
            <br className="hidden md:block" />
            사장님 가게 운영을 전반적으로 지원합니다
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200 bg-white p-7 transition-shadow hover:shadow-2"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <p className="mb-2 font-display text-h4 font-bold text-foreground">
                {title}
              </p>
              <p className="text-body-s text-neutral-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

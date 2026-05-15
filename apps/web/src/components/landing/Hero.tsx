import Link from 'next/link';
import { Button } from '@on-schedule/ui/components/ui/button';
import { Check, MessageSquare, Calendar, Bell } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden bg-cream-50/40 py-14 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-16 px-6 md:grid-cols-[1.05fr_0.95fr]">
        {/* 좌측: 메시지 */}
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-accent-foreground">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" />
            사전 신청 진행 중 · 선착순 100명
          </span>

          <h1 className="mb-5 font-display text-[40px] font-extrabold leading-[1.18] tracking-[-0.028em] text-foreground text-balance break-keep md:mb-6 md:text-[56px] md:leading-[1.08] md:tracking-[-0.030em]">
            예약 받기, 알림 보내기,{' '}
            <span className="text-highlight">고객 관리까지</span>
            <br className="hidden md:block" /> 모두 한 곳에
          </h1>

          <p className="mb-3 text-h4 font-bold text-foreground">
            사장님이 가장 쉽게 만드는 예약 시스템
          </p>

          <p className="mb-8 max-w-[480px] text-body-l text-neutral-700">
            여기저기 흩어진 예약을 한 곳에서 관리하고
            <br />
            사장님 시간을 돌려드립니다
          </p>

          <div className="mb-5 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-14 bg-brand-500 px-7 text-[16px] font-bold text-white hover:bg-brand-600"
            >
              <Link href="#signup">사전 신청 →</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-neutral-300 px-7 text-[16px] font-semibold text-foreground hover:bg-neutral-50"
            >
              <Link href="#features">기능 보기</Link>
            </Button>
          </div>

          <p className="mb-8 text-[13px] text-neutral-700">
            선착순 100명 · 이메일만 입력 · 30초
          </p>

          <ul className="grid gap-2.5 text-body-s text-neutral-700">
            {[
              '출시 후 3개월 무료',
              '오픈 전 미리 사용',
              '평생 회원가 보장',
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success-500" strokeWidth={2.5} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* 우측: 통합 시각화 카드 */}
        <div className="relative w-full">
          <div className="phone-glow relative mx-auto w-full max-w-[340px]">
            <div className="relative w-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-3">
              <div className="mb-5 flex items-center gap-3 border-b border-neutral-100 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-[20px]">
                  🍞
                </div>
                <div>
                  <p className="font-display text-h4 text-foreground">
                    베이커리 우진
                  </p>
                  <p className="text-[12px] text-neutral-700">오늘의 예약 7건</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    icon: <Calendar className="h-4 w-4" />,
                    label: '인스타 댓글 → 예약',
                    badge: '확정',
                    badgeColor: 'bg-success-500',
                  },
                  {
                    icon: <MessageSquare className="h-4 w-4" />,
                    label: '카톡 DM → 예약',
                    badge: '확정',
                    badgeColor: 'bg-success-500',
                  },
                  {
                    icon: <Bell className="h-4 w-4" />,
                    label: '리마인드 알림톡 발송',
                    badge: '자동',
                    badgeColor: 'bg-brand-500',
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-3.5 py-3"
                  >
                    <div className="flex items-center gap-2.5 text-body-s text-foreground">
                      <span className="text-neutral-700">{row.icon}</span>
                      {row.label}
                    </div>
                    <span
                      className={`rounded-full ${row.badgeColor} px-2 py-0.5 text-[10px] font-bold text-white`}
                    >
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-cream-50 px-4 py-3.5 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
                  한 곳에서 관리
                </p>
                <p className="mt-1 font-display text-h3 font-extrabold text-foreground">
                  카톡 · 인스타 · 톡톡
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

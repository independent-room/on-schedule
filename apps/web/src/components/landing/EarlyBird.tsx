import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@on-schedule/ui/components/ui/button';
import { getSupabaseAdmin } from '@/lib/supabase';
import { SectionHeading } from './SectionHeading';

const TARGET = 100;

async function getWaitlistCount(): Promise<number> {
  // build-time static rendering 방지 → 매 요청 fresh count
  noStore();
  try {
    const { count, error } = await getSupabaseAdmin()
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count ?? 0;
  } catch (err) {
    console.error('[EarlyBird] waitlist count failed:', err);
    return 0;
  }
}

const BENEFITS = [
  {
    icon: Calendar,
    title: '출시 후 3개월 무료',
    desc: '정식 출시일부터 90일간 무료 사용',
  },
  {
    icon: Sparkles,
    title: '오픈 전 미리 사용',
    desc: '일반 오픈 전 먼저 써보고 의견 주세요',
  },
  {
    icon: ShieldCheck,
    title: '평생 회원가 보장',
    desc: '가격 인상 시에도 처음 가격 그대로',
  },
];

export async function EarlyBird() {
  const count = await getWaitlistCount();
  const percent = Math.min((count / TARGET) * 100, 100);
  const remaining = Math.max(TARGET - count, 0);

  return (
    <section className="border-y border-neutral-200 bg-white py-14 md:py-28">
      <div className="mx-auto max-w-[920px] px-6">
        <SectionHeading
          className="mb-12"
          eyebrow="얼리버드 한정"
          eyebrowVariant="solid"
          title={
            <>
              선착순 <span className="text-brand-500">{TARGET}명</span>에게만 드리는 혜택
            </>
          }
          subtitle="사전 신청자에게 평생 가는 세 가지 약속"
        />

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200 bg-cream-50/40 p-5 md:p-7"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p
                className="mb-2 text-h4 text-foreground font-display font-bold"
              >
                {title}
              </p>
              <p className="text-body-s text-neutral-700">{desc}</p>
            </div>
          ))}
        </div>

        {/* 신청 카운터 + 진행 바 */}
        <div className="rounded-2xl border border-brand-500/30 bg-cream-50/60 p-5 md:p-7">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-h3 text-foreground font-extrabold">
              <span className="text-brand-500">{count}</span>
              <span className="text-neutral-500">/{TARGET}명</span>
              <span className="ml-2 text-body-s font-medium text-neutral-700">
                신청 완료
              </span>
            </p>
            {remaining > 0 ? (
              <p className="text-body-s text-neutral-700">
                남은 자리 <strong className="text-brand-700">{remaining}명</strong>
              </p>
            ) : (
              <p className="text-body-s font-bold text-brand-700">마감 임박 🔥</p>
            )}
          </div>
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <Button
            asChild
            size="lg"
            className="h-14 w-full bg-brand-500 text-[16px] font-bold text-white hover:bg-brand-600"
          >
            <Link href="#signup">사전 신청하기 →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

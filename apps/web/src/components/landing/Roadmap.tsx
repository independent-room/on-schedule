import { Calendar } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

type Milestone = {
  when: string;
  version: string;
  features: string;
  status: 'in-progress' | 'planned';
};

const ROADMAP: Milestone[] = [
  {
    when: '2026 하반기',
    version: 'MVP',
    features: '예약 관리 · 알림톡 무제한 · 노쇼 관리 · 단계별 셋업',
    status: 'in-progress',
  },
  {
    when: 'MVP + 2개월',
    version: 'v2',
    features: '자동 고객 관리(CRM) · 매출 대시보드 · 예약금/보증금',
    status: 'planned',
  },
  {
    when: 'v2 + 3개월',
    version: 'v3',
    features: 'AI 챗봇(RAG) · 마케팅 메시지 · 노쇼 통계',
    status: 'planned',
  },
];

export function Roadmap() {
  return (
    <section className="bg-cream-50/40 py-20 md:py-28">
      <div className="mx-auto max-w-[920px] px-6">
        <SectionHeading
          className="mb-12"
          eyebrow="출시 일정"
          title="언제 쓰실 수 있나요?"
          subtitle="사전 신청자는 1순위로 초대받습니다"
        />

        <ol className="relative ml-3 space-y-6 border-l-2 border-dashed border-neutral-200 pl-8">
          {ROADMAP.map(({ when, version, features, status }, i) => (
            <li key={version} className="relative">
              <span
                className={`absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  status === 'in-progress'
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700'
                }`}
              >
                <Calendar className="h-4 w-4" strokeWidth={2} />
              </span>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-body-s font-bold text-neutral-700">
                    {when}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      status === 'in-progress'
                        ? 'bg-brand-500 text-white'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {version}
                  </span>
                  {status === 'in-progress' && (
                    <span className="text-[11px] font-bold text-brand-700">
                      개발 중
                    </span>
                  )}
                </div>
                <p
                  className="text-h4 text-foreground font-display font-bold"
                >
                  {features}
                </p>
              </div>
              {i < ROADMAP.length - 1 && (
                <div className="absolute -left-[26px] top-12 h-[calc(100%-1rem)] w-px" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

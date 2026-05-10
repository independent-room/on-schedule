import { Link2, ListChecks, MessageSquare, UserX, Users } from 'lucide-react';

type Feature = {
  question: string;
  name: string;
  desc: string;
  badge: 'MVP' | 'v2';
  icon: typeof Link2;
};

const FEATURES: Feature[] = [
  {
    question: '매번 카톡, 인스타, 톡톡 답장 다니시나요?',
    name: '샵 전용 예약 링크',
    desc: '링크 하나로 언제 어디서든\n고객이 알아서 예약 가능',
    badge: 'MVP',
    icon: Link2,
  },
  {
    question: '예약 셋팅, 어디서부터 시작해야 할지 막막하신가요?',
    name: '단계별 셋업',
    desc: '메뉴, 시간, 결제, 알림까지\n순서대로 5분이면 끝',
    badge: 'MVP',
    icon: ListChecks,
  },
  {
    question: '예약 알림 매번 직접 보내시나요?',
    name: '자동 알림톡',
    desc: '사장님을 대신하는\n똑똑한 카톡 알림',
    badge: 'MVP',
    icon: MessageSquare,
  },
  {
    question: '노쇼로 매출 새는 거, 이제 그만하고 싶으시죠?',
    name: '노쇼 자동 관리',
    desc: '단계별로 자동 처리하고\n반복 노쇼는 차단까지',
    badge: 'MVP',
    icon: UserX,
  },
  {
    question: '단골 고객을 더 챙기고 싶으신가요?',
    name: '자동 고객 관리',
    desc: '방문 이력부터 단골 표시까지\n사장님 대신 기억해드립니다',
    badge: 'v2',
    icon: Users,
  },
];

export function FeatureCards() {
  return (
    <section
      id="features"
      className="bg-cream-50/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-[12px] font-bold text-accent-foreground">
            핵심 기능
          </span>
          <h2 className="font-display text-h2 font-extrabold text-foreground md:text-[36px]">
            사장님이 매일 마주하던 불편함,
            <br />
            한 번에 해결합니다
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ question, name, desc, badge, icon: Icon }) => (
            <article
              key={name}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-3"
            >
              <p className="mb-5 min-h-[3em] text-body-l text-neutral-700">
                {question}
              </p>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="flex-1 font-display text-h4 font-bold text-foreground">
                  {name}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    badge === 'MVP'
                      ? 'bg-brand-500 text-white'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {badge}
                </span>
              </div>

              <p className="whitespace-pre-line text-body-s text-neutral-700">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

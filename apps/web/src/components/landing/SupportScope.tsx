import { Cake, Scissors, Coffee, Sparkles, Cookie, Brush } from 'lucide-react';

const INDUSTRIES = [
  { name: '베이커리', icon: Cake },
  { name: '디저트', icon: Cookie },
  { name: '카페', icon: Coffee },
  { name: '뷰티', icon: Brush },
  { name: '타투/반영구', icon: Scissors },
  { name: '원데이클래스', icon: Sparkles },
];

export function SupportScope() {
  return (
    <section className="border-y border-neutral-200 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-h2 font-extrabold text-foreground text-pretty md:text-[36px]">
            베이커리부터 뷰티, 원데이클래스까지
            <br className="hidden md:block" />
            <span className="text-brand-500"> 온스케줄은 모든 자영업을 지원합니다</span>
          </h2>
          <p className="mx-auto max-w-xl text-body-l text-neutral-700">
            업종 가리지 않는 범용 시스템입니다.
            <br className="hidden md:block" />
            사장님 가게 특성에 맞춰 단계별로 셋팅됩니다.
          </p>
        </div>

        <ul className="mx-auto flex max-w-[820px] flex-wrap justify-center gap-3">
          {INDUSTRIES.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-cream-50/60 px-5 py-2.5 text-body-s font-semibold text-foreground"
            >
              <Icon className="h-4 w-4 text-brand-500" strokeWidth={1.75} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

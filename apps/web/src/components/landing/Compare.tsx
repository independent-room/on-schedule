import { Check, X } from 'lucide-react';

const rows = [
  { label: '기본 요금', us: '베타 무료 → 월 3~5만원', naver: '무료', catch: '월 5~10만원' },
  { label: '결제 수수료', us: '0.4% (영세)', naver: '3.74%', catch: '3.5%' },
  { label: '예약 확정 방식', us: '사장님이 직접 선택', naver: '자동 확정 (거절 불가)', catch: '자동' },
  { label: '픽업 시간 단위', us: '자유', naver: '30분/1시간 고정', catch: '30분 고정' },
  { label: '일일 수량 한도', us: '있음', naver: '없음 (중복 발생)', catch: '없음' },
  { label: '노쇼 이력', us: '자동 누적', naver: '없음', catch: '있음' },
  { label: '카카오 알림톡', us: '자동 발송', naver: '없음', catch: '있음' },
];

export function Compare() {
  return (
    <section className="bg-white px-6 py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-[60px] text-center">
          <span
            className="mb-[18px] inline-block rounded-pill bg-brand-100 px-3 py-[5px] text-[12px] font-bold text-brand-800"
            style={{ letterSpacing: '0.02em' }}
          >
            비교
          </span>
          <h2
            className="mb-4 text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 44px)',
              lineHeight: 1.16,
              letterSpacing: '-0.030em',
            }}
          >
            네이버·캐치테이블과 어떻게 다른가요
          </h2>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-line-subtle bg-white shadow-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line-subtle bg-cream-50">
                <th className="px-6 py-5 text-[13px] font-semibold text-neutral-700">
                  항목
                </th>
                <th className="relative px-6 py-5 text-[14px] font-bold text-brand-500">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-brand-500 px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                    추천
                  </span>
                  온스케줄
                </th>
                <th className="px-6 py-5 text-[14px] font-bold text-neutral-700">
                  네이버 예약
                </th>
                <th className="px-6 py-5 text-[14px] font-bold text-neutral-700">
                  캐치테이블
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={
                    i !== rows.length - 1
                      ? 'border-b border-line-subtle'
                      : undefined
                  }
                >
                  <td className="px-6 py-4 text-[14px] font-medium text-foreground">
                    {row.label}
                  </td>
                  <td className="bg-brand-50/40 px-6 py-4 text-[14px] font-semibold text-brand-700">
                    {row.us}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-neutral-700">
                    {row.naver}
                  </td>
                  <td className="px-6 py-4 text-[14px] text-neutral-700">
                    {row.catch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-[13px] text-neutral-600">
          * 캐치테이블은 레스토랑 특화. 베이커리·디저트 컨텍스트의 일반 비교입니다.
        </p>
      </div>
    </section>
  );
}

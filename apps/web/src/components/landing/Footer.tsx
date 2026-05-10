import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* 브랜드 */}
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white"
                style={{
                  fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: '12px',
                  lineHeight: 1,
                }}
              >
                온
              </div>
              <span className="text-body-l font-bold text-foreground">온스케줄</span>
              <span className="text-body-s text-neutral-500">© 2026</span>
            </div>
            <p className="text-body-s text-neutral-700">
              사장님이 가장 쉽게 만드는 예약 시스템
            </p>
          </div>

          {/* 링크 */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-body-s text-neutral-700">
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <a href="mailto:contact@onschedule.kr" className="hover:text-foreground">
                  contact@onschedule.kr
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* 사업자 정보 (네이버 광고 심사 필수) */}
        <div className="border-t border-neutral-100 pt-6">
          <p className="text-[12px] leading-relaxed text-neutral-700">
            <strong className="text-foreground">인디펜던트룸</strong>{' '}
            <span className="text-neutral-500">(Independent Room)</span>
            <span className="mx-2 text-neutral-300">·</span>
            대표 이용민
            <span className="mx-2 text-neutral-300">·</span>
            사업자등록번호{' '}
            <span className="text-neutral-500">[준비 중]</span>
            <span className="mx-2 text-neutral-300">·</span>
            <span className="text-neutral-500">[사업장 주소 준비 중]</span>
            <br />
            문의 <a href="mailto:contact@onschedule.kr" className="text-brand-700 underline">contact@onschedule.kr</a>
          </p>
          <p className="mt-4 text-[11px] text-neutral-500">
            디자인 시스템: Wanted Design System (CC BY 4.0) 기반 · 폰트: Pretendard JP, Wanted Sans, JetBrains Mono (OFL) · 아이콘: Lucide (MIT)
          </p>
        </div>
      </div>
    </footer>
  );
}

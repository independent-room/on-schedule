import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-line-subtle bg-white px-6 py-10">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white"
              style={{
                fontFamily: 'Wanted Sans Variable, sans-serif',
                fontWeight: 800,
                fontSize: '12px',
                lineHeight: 1,
              }}
            >
              온
            </div>
            <span className="text-[15px] font-bold text-foreground">
              온스케줄
            </span>
            <span className="text-[12px] text-neutral-700">© 2026</span>
          </div>

          <div className="flex flex-wrap gap-5 text-[13px] text-neutral-700">
            <Link href="/terms" className="hover:text-foreground">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              개인정보 처리방침
            </Link>
            <Link href="/business" className="hover:text-foreground">
              사업자정보
            </Link>
            <a href="mailto:hello@on-schedule.com" className="hover:text-foreground">
              hello@on-schedule.com
            </a>
          </div>
        </div>

        <p className="mt-8 text-[12px] leading-relaxed text-neutral-600">
          디자인 시스템: Wanted Design System (CC BY 4.0) 기반.
          <br />
          폰트: Pretendard (OFL), Wanted Sans (OFL), JetBrains Mono (OFL). 아이콘:
          Lucide (MIT).
        </p>
      </div>
    </footer>
  );
}

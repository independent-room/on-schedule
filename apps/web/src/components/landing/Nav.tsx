import Link from 'next/link';

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-line-subtle bg-bg-primary/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand-500 text-white"
            style={{
              fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
              fontWeight: 800,
              fontSize: '14px',
              lineHeight: 1,
            }}
          >
            온
          </div>
          <span
            className="text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
              fontWeight: 800,
              fontSize: '19px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            온스케줄
          </span>
          <span className="ml-0.5 text-[12px] font-semibold leading-none text-neutral-700">
            On Schedule
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="#problems"
            className="text-[14px] font-semibold leading-none text-neutral-700 transition-colors hover:text-foreground"
          >
            왜 필요한가요
          </Link>
          <Link
            href="#solution"
            className="text-[14px] font-semibold leading-none text-neutral-700 transition-colors hover:text-foreground"
          >
            어떻게 해결하나요
          </Link>
          <Link
            href="#faq"
            className="text-[14px] font-semibold leading-none text-neutral-700 transition-colors hover:text-foreground"
          >
            자주 묻는 질문
          </Link>
          <Link
            href="#signup"
            className="inline-flex h-11 items-center rounded-lg bg-brand-500 px-[18px] text-[14px] font-bold text-white transition-all hover:-translate-y-px hover:bg-brand-600"
          >
            사전 신청
          </Link>
        </div>
      </div>
    </nav>
  );
}

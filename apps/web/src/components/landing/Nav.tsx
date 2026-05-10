import Link from 'next/link';
import { Button } from '@on-schedule/ui/components/ui/button';

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur-lg">
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
        </Link>

        <Button
          asChild
          className="bg-brand-500 px-5 font-bold text-white hover:bg-brand-600"
        >
          <Link href="#signup">사전 신청 →</Link>
        </Button>
      </div>
    </nav>
  );
}

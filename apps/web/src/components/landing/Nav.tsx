import Link from 'next/link';
import { Button } from '@on-schedule/ui/components/ui/button';
import { BrandMark } from '@/components/BrandMark';

export function Nav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
        <Link href="/">
          <BrandMark size="md" />
        </Link>

        <Button
          asChild
          className="bg-brand-500 px-5 font-bold text-white hover:bg-brand-600"
        >
          <Link href="/#signup">사전 신청 →</Link>
        </Button>
      </div>
    </nav>
  );
}

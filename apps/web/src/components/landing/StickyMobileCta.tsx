'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@on-schedule/ui/components/ui/button';

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 shadow-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <Button
        asChild
        size="lg"
        className="h-12 w-full bg-brand-500 font-bold text-white hover:bg-brand-600"
      >
        <Link href="#signup">사전 신청 →</Link>
      </Button>
    </div>
  );
}

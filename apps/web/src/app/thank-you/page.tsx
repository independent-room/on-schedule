import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@on-schedule/ui/components/ui/button';
import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';
import { InterviewOptIn } from '@/components/InterviewOptIn';

export const metadata = {
  title: '신청 완료 — 온스케줄',
  description: '사전 신청이 완료됐습니다. 출시 1순위 안내드릴게요.',
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ email?: string }>;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { email } = await searchParams;
  const safeEmail = email ?? null;

  return (
    <>
      <Nav />
      <main className="bg-cream-50/40 py-20 md:py-28">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>

          <h1
            className="mb-4 text-h1 text-foreground md:text-[40px] font-display font-extrabold"
          >
            신청 완료! 감사합니다.
          </h1>

          <p className="mb-3 text-body-l text-neutral-700">
            사장님, 사전 신청이 완료됐습니다.
            <br />
            출시 소식은 입력하신 이메일로 보내드릴게요.
          </p>

          <p className="mb-10 text-body text-neutral-700">
            방금 <strong className="text-foreground">신청 확인 메일</strong>이 발송됐습니다.
            <br />
            받은편지함이 비어 있으면 <strong>스팸함</strong>도 한 번 확인 부탁드려요.
          </p>

          {/* 인터뷰 참여 신청 — 별도 액션 */}
          <div className="mb-10 text-left">
            <InterviewOptIn email={safeEmail} />
          </div>

          <Button
            asChild
            variant="outline"
            className="h-12 border-neutral-300 px-6 text-body-s font-semibold text-foreground hover:bg-neutral-50"
          >
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@on-schedule/ui/components/ui/button';
import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: '신청 완료 — 온스케줄',
  description: '사전 신청이 완료됐습니다. 출시 1순위 안내드릴게요.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="bg-cream-50/40 py-20 md:py-28">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>

          <h1
            className="mb-4 text-h1 text-foreground md:text-[40px]"
            style={{
              fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
              fontWeight: 800,
            }}
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

          <div className="mb-10 rounded-2xl border border-brand-500/30 bg-white p-7 text-left">
            <p
              className="mb-3 text-h4 text-foreground"
              style={{
                fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
                fontWeight: 700,
              }}
            >
              10분만 시간 내주실 수 있으신가요?
            </p>
            <p className="mb-4 text-body text-neutral-700">
              사장님 의견을 듣고 더 좋은 서비스를 만들고 싶습니다. 인터뷰에 참여해주시면{' '}
              <strong className="text-brand-700">추가 1개월 무료</strong> 혜택을 드려요.
            </p>
            <p className="text-body-s text-neutral-700">
              곧 <strong>contact@onschedule.kr</strong>에서 일정 조율 메일을 드릴게요.
              회신만 주시면 됩니다.
            </p>
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

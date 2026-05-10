import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: '이용약관 — 온스케줄',
  description: '온스케줄 사전 신청 이용약관',
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="bg-white py-16 md:py-20">
        <article className="mx-auto max-w-[760px] px-6">
          <h1
            className="mb-3 text-h1 text-foreground"
            style={{
              fontFamily: 'Wanted Sans Variable, Wanted Sans, sans-serif',
              fontWeight: 800,
            }}
          >
            이용약관
          </h1>
          <p className="mb-10 text-body-s text-neutral-500">
            시행일: 2026년 5월 10일
          </p>

          <div className="space-y-8 text-body leading-relaxed text-neutral-700">
            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제1조 (목적)</h2>
              <p>
                본 약관은 인디펜던트룸(이하 "회사")이 제공하는 온스케줄 서비스(이하 "서비스")의 사전 신청 절차에 관한 사항을 규정합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제2조 (사전 신청의 효력)</h2>
              <p>
                사전 신청은 정식 출시 전 우선 안내를 받기 위한 등록 절차로, 회원 가입이나 유료 결제와 무관합니다.
                사전 신청만으로는 서비스 이용 권리·의무가 발생하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제3조 (얼리버드 혜택)</h2>
              <p>회사는 사전 신청자에게 다음 혜택을 제공합니다.</p>
              <ul className="mt-2 list-disc pl-6">
                <li>출시 후 90일간 무료 사용</li>
                <li>일반 오픈 전 베타 우선 사용 권한</li>
                <li>가격 인상 시에도 최초 가격 유지 (평생 회원가)</li>
              </ul>
              <p className="mt-3">
                혜택 적용은 신청 순서·정원(선착순 100명) 및 회사 사정에 따라 변경될 수 있으며, 변경 시 등록한 이메일로 사전 안내합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제4조 (정보 제공 동의)</h2>
              <p>
                사전 신청 시 정보 주체는 개인정보처리방침에 따른 개인정보 수집·이용 및 출시 알림 수신에 동의한 것으로 간주합니다.
                동의는 언제든 철회할 수 있으며, 철회 시 더 이상 안내 메일이 발송되지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제5조 (책임의 제한)</h2>
              <p>
                회사는 사전 신청 단계에서 서비스 출시 시기·기능·가격에 대한 어떠한 보장도 제공하지 않습니다.
                기획·개발 진행 상황에 따라 출시 일정 및 기능 범위는 변경될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">제6조 (문의)</h2>
              <p>
                약관 관련 문의: <a href="mailto:contact@onschedule.kr" className="text-brand-700 underline">contact@onschedule.kr</a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

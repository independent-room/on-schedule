import { Nav } from '@/components/landing/Nav';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: '개인정보처리방침 — 온스케줄',
  description: '인디펜던트룸 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-white py-16 md:py-20">
        <article className="prose-on-schedule mx-auto max-w-[760px] px-6">
          <h1
            className="mb-3 text-h1 text-foreground font-display font-extrabold"
          >
            개인정보처리방침
          </h1>
          <p className="mb-10 text-body-s text-neutral-500">
            시행일: 2026년 5월 10일
          </p>

          <div className="space-y-8 text-body leading-relaxed text-neutral-700">
            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">1. 개인정보 처리 목적</h2>
              <p>
                인디펜던트룸(이하 "회사")은 다음의 목적을 위해 개인정보를 처리합니다.
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>온스케줄 서비스 사전 신청 접수 및 출시 안내</li>
                <li>사전 신청자 대상 인터뷰 진행 (선택 동의자에 한함)</li>
                <li>서비스 개선을 위한 통계 분석 (익명화 처리)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">2. 처리하는 개인정보 항목</h2>
              <ul className="list-disc pl-6">
                <li><strong>필수</strong>: 이메일, 업종</li>
                <li><strong>선택</strong>: 전화번호 (인터뷰 동의자에 한함)</li>
                <li><strong>자동 수집</strong>: User-Agent, 익명화된 IP 해시 (스팸 방지 목적, 원본 IP 미저장)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">3. 개인정보 보유 및 이용 기간</h2>
              <p>
                서비스 출시 안내 발송 완료 시점 또는 정보 주체의 동의 철회 요청 시까지 보관합니다.
                다만 관련 법령에서 보존을 요구하는 경우 해당 기간 동안 보관합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">4. 제3자 제공</h2>
              <p>
                회사는 정보 주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
                다만 다음의 경우는 예외로 합니다.
              </p>
              <ul className="mt-2 list-disc pl-6">
                <li>법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">5. 처리 위탁</h2>
              <p>회사는 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
              <ul className="mt-2 list-disc pl-6">
                <li><strong>Supabase</strong> (데이터베이스 호스팅, 미국)</li>
                <li><strong>Resend</strong> (이메일 발송, 미국)</li>
                <li><strong>Vercel</strong> (웹 호스팅, 미국)</li>
                <li><strong>Cloudflare</strong> (DNS 및 보안, 미국)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">6. 정보 주체의 권리</h2>
              <p>
                정보 주체는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있습니다.
                요청은 <a href="mailto:contact@onschedule.kr" className="text-brand-700 underline">contact@onschedule.kr</a>로 보내주시면 지체 없이 조치합니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-h3 font-bold text-foreground">7. 개인정보 보호 책임자</h2>
              <p>
                <strong>이름</strong>: 이용민<br />
                <strong>이메일</strong>: <a href="mailto:contact@onschedule.kr" className="text-brand-700 underline">contact@onschedule.kr</a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

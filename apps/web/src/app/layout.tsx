import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://onschedule.kr'),
  title: '온스케줄 — 예약 받기, 알림 보내기, 고객 관리까지 한 곳에',
  description:
    '카톡·인스타·네이버 톡톡으로 흩어진 예약을 한 곳에서. 5분 셋팅, 알림톡 무제한. 사장님이 가장 쉽게 만드는 예약 시스템.',
  applicationName: '온스케줄',
  authors: [{ name: '인디펜던트룸' }],
  keywords: [
    '온스케줄',
    '예약 관리 프로그램',
    '베이커리 예약',
    '노쇼 방지',
    '알림톡',
    '예약 SaaS',
    '예약 시스템',
    '자영업',
    '소상공인 도구',
  ],
  openGraph: {
    title: '온스케줄 — 사장님이 가장 쉽게 만드는 예약 시스템',
    description: '카톡·인스타·네이버로 흩어진 예약을 한 곳에. 5분 셋팅, 알림톡 무제한.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '온스케줄',
    url: 'https://onschedule.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '온스케줄 — 사장님이 가장 쉽게 만드는 예약 시스템',
    description: '카톡·인스타·네이버로 흩어진 예약을 한 곳에. 5분 셋팅, 알림톡 무제한.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E8761A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-0">
        {children}
      </body>
    </html>
  );
}

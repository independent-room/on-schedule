import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '온스케줄 — 노쇼 0건, 수수료 1/9. 동네 가게 예약 SaaS',
  description:
    '카톡 DM으로 받던 예약을 자동화하세요. 선결제로 노쇼 막고, 알림톡으로 자동 안내. 결제 수수료 0.4%.',
  applicationName: '온스케줄',
  authors: [{ name: '온스케줄 팀' }],
  keywords: [
    '온스케줄',
    '베이커리 예약',
    '디저트 예약',
    '노쇼 관리',
    '알림톡',
    'SaaS',
    '예약 시스템',
  ],
  openGraph: {
    title: '온스케줄 — 노쇼 0건, 수수료 1/9',
    description: '카톡 DM 예약 자동화. 선결제로 노쇼 막고, 알림톡 자동 안내.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '온스케줄',
  },
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
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}

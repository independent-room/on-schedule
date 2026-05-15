import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// runtime: nodejs (default). edge는 Vercel Hobby plan 1MB 한도, Pretendard OTF 3.2MB라 초과.
// og:image는 소셜 크롤러 1회 + 캐시라 cold start 영향 무시 가능.
// dynamic 강제: build time prerender 막아 readFile 호출이 런타임으로 미뤄짐.
export const dynamic = 'force-dynamic';
export const alt = '온스케줄 — 사장님이 가장 쉽게 만드는 예약 시스템';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// satori(ImageResponse) supports TTF/OTF only — woff2 미지원.
// 로컬 self-host로 외부 의존 0. import.meta.url로 edge runtime에서 정적 자산 resolve.
export default async function OGImage() {
  // process.cwd() = workspace dir (apps/web). dev/Vercel 모두 동일.
  // outputFileTracingIncludes로 빌드 시 폰트 함수 번들에 포함 보장.
  const fontDir = path.join(process.cwd(), 'src/fonts');
  const [bold, extraBold] = await Promise.all([
    readFile(path.join(fontDir, 'Pretendard-Bold.otf')),
    readFile(path.join(fontDir, 'Pretendard-ExtraBold.otf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF6EF',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: 'Pretendard',
          color: '#1A1410',
        }}
      >
        {/* 상단: 로고 + 워드마크 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#E8761A" />
            <circle cx="26" cy="32" r="11" stroke="#FAF6EF" strokeWidth="4.2" fill="none" />
            <circle cx="44" cy="42" r="3.6" fill="#FAF6EF" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.030em' }}>
            온스케줄
          </span>
        </div>

        {/* 메인 카피 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 80,
            fontWeight: 800,
            fontSize: 76,
            lineHeight: 1.18,
            letterSpacing: '-0.028em',
          }}
        >
          <span style={{ display: 'flex', flexWrap: 'wrap' }}>
            예약 받기, 알림 보내기,
          </span>
          <span style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
            <span style={{ color: '#E8761A' }}>고객 관리까지</span>
            <span style={{ marginLeft: 16 }}>한 곳에</span>
          </span>
        </div>

        {/* 서브 카피 */}
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            fontWeight: 700,
            color: 'rgba(26,20,16,0.72)',
            letterSpacing: '-0.014em',
          }}
        >
          사장님이 가장 쉽게 만드는 예약 시스템
        </div>

        {/* 하단 footer */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            fontWeight: 700,
            color: 'rgba(26,20,16,0.55)',
          }}
        >
          <span>onschedule.kr</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                display: 'flex',
                background: '#E8761A',
                color: '#FAF6EF',
                padding: '8px 18px',
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '0.02em',
              }}
            >
              사전 신청 진행 중 · 선착순 100명
            </span>
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Pretendard', data: bold, style: 'normal', weight: 700 },
        { name: 'Pretendard', data: extraBold, style: 'normal', weight: 800 },
      ],
    },
  );
}

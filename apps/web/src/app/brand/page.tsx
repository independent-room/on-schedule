import type { Metadata } from 'next';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';

export const metadata: Metadata = {
  title: '온스케줄 로고 미리보기',
  robots: { index: false, follow: false },
};

const SIZES = [16, 24, 32, 48, 64, 96, 128, 256];

const BACKGROUNDS = [
  { name: 'paper', cls: 'bg-cream-50/60', label: 'Paper', mono: 'text-neutral-500' },
  { name: 'white', cls: 'bg-white', label: 'White', mono: 'text-neutral-500' },
  { name: 'dark', cls: 'bg-foreground', label: 'Dark', mono: 'text-white/70' },
  { name: 'brand', cls: 'bg-brand-500', label: 'Brand', mono: 'text-white/80' },
];

function MasterIcon({ size, square = false }: { size: number; square?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx={square ? 0 : 14} fill="#E8761A" />
      <circle cx="26" cy="32" r="11" stroke="#FAF6EF" strokeWidth="4.2" fill="none" />
      <circle cx="44" cy="42" r="3.6" fill="#FAF6EF" />
    </svg>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
      <header className="mb-6">
        <h2 className="font-display text-h3 font-bold text-foreground">{title}</h2>
        {subtitle && <p className="mt-1 text-body-s text-neutral-700">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

export default function BrandPreviewPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-14">
      <header className="mb-12">
        <Link href="/" className="text-body-s text-neutral-500 hover:text-foreground">
          ← 홈으로
        </Link>
        <h1 className="mt-4 font-display text-h1 font-extrabold text-foreground">
          온스케줄 로고 미리보기
        </h1>
        <p className="mt-2 text-body-l text-neutral-700">
          크기·배경·컨텍스트별로 한 페이지에서 확인. 결정 시 BrandMark 또는 og:image 디자인 변경.
        </p>
      </header>

      <div className="space-y-8">

        {/* 1. 마스터 SVG */}
        <Card title="마스터 SVG" subtitle="둥근 (web/PWA용) vs 정사각 (iOS App Store native — iOS가 자동 마스킹).">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-100 bg-cream-50/40 p-8 text-center">
              <div className="inline-block">
                <MasterIcon size={160} />
              </div>
              <p className="mt-4 font-mono text-[12px] text-neutral-500">둥근 사각 · web favicon · apple-icon</p>
            </div>
            <div className="rounded-xl border border-neutral-100 bg-cream-50/40 p-8 text-center">
              <div className="inline-block">
                <MasterIcon size={160} square />
              </div>
              <p className="mt-4 font-mono text-[12px] text-neutral-500">정사각 (rx 0) · iOS App Store 1024 PNG export용</p>
            </div>
          </div>
        </Card>

        {/* 2. 사이즈별 */}
        <Card title="사이즈별 가독성" subtitle="favicon 16부터 앱 미리보기 256까지. 작은 사이즈에서 디테일 살아있는지 확인.">
          <div className="flex flex-wrap items-end gap-6">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div className="flex h-[260px] items-end">
                  <MasterIcon size={size} />
                </div>
                <span className="font-mono text-[11px] text-neutral-500">{size}px</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. 배경별 */}
        <Card title="배경별" subtitle="다양한 surface에서 contrast 확인.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BACKGROUNDS.map((bg) => (
              <div key={bg.name} className={`rounded-xl ${bg.cls} flex flex-col items-center gap-4 p-10`}>
                <MasterIcon size={96} />
                <span className={`font-mono text-[11px] ${bg.mono}`}>{bg.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. 컨텍스트 시뮬 */}
        <Card title="컨텍스트 시뮬레이션" subtitle="실사용처에서 어떻게 보이는지.">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Site Nav */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">Site Nav (현재)</p>
              <div className="rounded-xl border border-neutral-200 bg-white">
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                  <BrandMark size="md" />
                  <button className="rounded-md bg-brand-500 px-4 py-2 text-body-s font-bold text-white">
                    사전 신청 →
                  </button>
                </div>
                <p className="px-6 py-3 text-[12px] text-neutral-500">
                  현재 BrandMark — 캐러멜 사각 안 "온" 글자 mark. 새 시계 단순화 디자인과 톤 다름.
                </p>
              </div>
            </div>

            {/* Site Nav with new icon */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">Site Nav (새 아이콘 적용 시뮬)</p>
              <div className="rounded-xl border border-neutral-200 bg-white">
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                  <span className="inline-flex items-center gap-2.5">
                    <MasterIcon size={30} />
                    <span className="font-display text-[19px] font-extrabold leading-none -tracking-[0.02em] text-foreground">
                      온스케줄
                    </span>
                  </span>
                  <button className="rounded-md bg-brand-500 px-4 py-2 text-body-s font-bold text-white">
                    사전 신청 →
                  </button>
                </div>
                <p className="px-6 py-3 text-[12px] text-neutral-500">
                  새 아이콘 + 한글 워드마크 콤보. BrandMark 교체 시 이 모습.
                </p>
              </div>
            </div>

            {/* Instagram Profile */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">Instagram Profile (원형 mask)</p>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <div className="overflow-hidden rounded-full">
                  <MasterIcon size={72} />
                </div>
                <div>
                  <p className="font-bold text-foreground">@onschedule</p>
                  <p className="text-body-s text-neutral-700">온스케줄 · 예약 시스템</p>
                </div>
              </div>
            </div>

            {/* iOS Home */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">iOS Home (squircle 22%)</p>
              <div className="flex items-center gap-3 rounded-xl bg-neutral-100 p-5">
                <div className="overflow-hidden" style={{ borderRadius: '22%' }}>
                  <MasterIcon size={72} square />
                </div>
                <span className="font-bold text-foreground">온스케줄</span>
              </div>
            </div>

            {/* Android Adaptive */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">Android Adaptive (3 mask)</p>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                {[
                  { shape: 'circle', cls: 'rounded-full' },
                  { shape: 'squircle', cls: 'rounded-[28%]' },
                  { shape: 'rounded-square', cls: 'rounded-2xl' },
                ].map((m) => (
                  <div key={m.shape} className={`overflow-hidden ${m.cls}`}>
                    <MasterIcon size={56} square />
                  </div>
                ))}
              </div>
            </div>

            {/* KakaoTalk Channel */}
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">KakaoTalk Channel (정사각 라운드)</p>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-[#FFE812] p-5">
                <div className="overflow-hidden rounded-md">
                  <MasterIcon size={56} />
                </div>
                <span className="font-bold text-[#3B1E1E]">온스케줄 채널</span>
              </div>
            </div>

            {/* Browser tab */}
            <div className="md:col-span-2">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">Browser Tab favicon (16/32px)</p>
              <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-5">
                <div className="inline-flex items-center gap-2 rounded-t-md bg-white px-4 py-2 shadow-sm">
                  <MasterIcon size={16} />
                  <span className="text-body-s text-foreground">온스케줄 — 사장님이 가장 쉽게…</span>
                  <span className="ml-2 text-neutral-400">×</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 5. og:image */}
        <Card
          title="OG Image (공유 카드)"
          subtitle="카톡/슬랙/페북/트위터 링크 공유 시 미리보기. 1200×630 PNG (Next.js dynamic ImageResponse, /opengraph-image)."
        >
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/opengraph-image"
              alt="og preview"
              className="h-auto w-full rounded-md"
              style={{ aspectRatio: '1200 / 630' }}
            />
            <p className="mt-3 font-mono text-[11px] text-neutral-500">/opengraph-image · edge runtime, Pretendard 폰트 임베드</p>
          </div>
        </Card>

      </div>
    </main>
  );
}

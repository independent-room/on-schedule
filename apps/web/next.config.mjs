/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  // 모노레포 — 다른 워크스페이스 transpile
  transpilePackages: ['@on-schedule/tailwind-config', '@on-schedule/shared', '@on-schedule/ui'],
  // og:image route가 readFile로 폰트 OTF 접근. Vercel 함수 번들에 폰트 파일 포함 보장.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./src/fonts/Pretendard-*.otf'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  // 모노레포 — 다른 워크스페이스 transpile
  transpilePackages: ['@on-schedule/tailwind-config', '@on-schedule/shared', '@on-schedule/ui'],
};

export default nextConfig;

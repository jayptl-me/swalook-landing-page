/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Static export doesn't use remotePatterns — images come from public/
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Static export — matches render.yaml env: static + staticPublishPath: out
  output: 'export',
};

export default nextConfig;

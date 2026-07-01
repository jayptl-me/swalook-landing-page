/** @type {import('next').NextConfig} */
const nextConfig = {
  // Switch from static export to server mode so ISR (revalidate) and
  // API routes (revalidation webhook) work at runtime.
  // output: 'export',  — removed for ISR support
  images: {
    unoptimized: true,
  },
  // Allow revalidation webhook to be called from backend
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-Webhook-Secret' },
        ],
      },
    ];
  },
};

export default nextConfig;

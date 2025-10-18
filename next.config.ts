import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/thumb/*/**/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/en/thumb/*/**/**",
      },
    ],
  },

  async headers() {
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://upload.wikimedia.org;
      connect-src 'self' http://localhost:3000 https://*.vercel.app;
      font-src 'self' data:;
      object-src 'none';
      frame-ancestors 'none';
    `
      .replace(/\n/g, "")
      .trim();
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

/* 
 img-src 'self' blob: data:;
    font-src 'self';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
 */

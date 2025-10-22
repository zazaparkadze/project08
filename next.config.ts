import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*   crossOrigin: "anonymous", */
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
      connect-src '*';
      font-src 'self' data: *.google.com;
      object-src 'none';
      frame-ancestors 'none';
    `
      .replace(/\n/g, "")
      .trim();
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

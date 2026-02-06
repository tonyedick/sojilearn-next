import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sojilearn.com",
        port: "",
        pathname: "/assets/images/**",
      },
    ],
    unoptimized: false,
  },
  experimental: { scrollRestoration: true },
};

export default nextConfig;

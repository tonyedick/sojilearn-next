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
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blogassets.leverageedu.com",
        port: "",
        pathname: "/**",
      }
    ],
    unoptimized: false,
  },
  experimental: { scrollRestoration: true },
};

export default nextConfig;

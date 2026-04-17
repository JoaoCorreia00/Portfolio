import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/Portfolio",
  output: "export",  // <== enables static exports
  reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained build (.next/standalone) for a minimal Docker image (Fly).
  // Enabled only when BUILD_STANDALONE is set so platform builds such as
  // Vercel use their own optimal default output.
  output: process.env.BUILD_STANDALONE ? "standalone" : undefined,
};

export default nextConfig;

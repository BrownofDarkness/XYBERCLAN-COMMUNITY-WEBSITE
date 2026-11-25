import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so a stray lockfile higher up the disk (e.g. ~/package-lock.json)
  // does not make Turbopack guess the wrong root and print a warning.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;

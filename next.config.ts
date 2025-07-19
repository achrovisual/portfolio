import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "uuid",
    "pino",
    "pino-pretty",
    "react-device-detect",
  ],
};

export default nextConfig;

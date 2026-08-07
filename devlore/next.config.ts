import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "269jtzes95.ufs.sh",
        port: "",
        pathname: "**/**",
      },
    ],
  },
};

export default nextConfig;

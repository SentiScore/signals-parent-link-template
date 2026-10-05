import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hidden pages must never be indexed or cached by intermediaries.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
};

export default nextConfig;

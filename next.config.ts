import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "use cache" for page content (lib/data.ts).
  cacheComponents: true,
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

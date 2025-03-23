/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // Allows cross-origin communication
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp", // Default, adjust if needed
          },
        ],
      },
    ];
  },
};

export default nextConfig;

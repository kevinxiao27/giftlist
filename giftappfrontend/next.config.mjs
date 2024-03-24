/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "buffer.com"],
  },
  env: {
    UNSPLASH_API_KEY: process.env.UNSPLASH_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: "/unsplash/:path*",
        destination: "https://api.unsplash.com/:path*",
      },
      {
        source: "/swiftgift/:path*",
        destination: "https://swiftgift.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;

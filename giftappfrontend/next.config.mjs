/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/swiftgift/:path*",
        destination: "https://swiftgift.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/brand/materna360-logo.png",
        destination: "/1.png",
      },
    ];
  },
};
export default nextConfig;

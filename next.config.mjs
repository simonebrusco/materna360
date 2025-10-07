/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId() {
    return 'm360-' + Date.now();
  },
};

export default nextConfig;

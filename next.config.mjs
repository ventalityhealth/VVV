/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The site ships with placeholder rasters; lint is run separately in CI.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // A stray lockfile in the parent folder would otherwise be picked as workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;

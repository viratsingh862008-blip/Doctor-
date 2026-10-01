import type { NextConfig } from 'next';
const nextConfig:NextConfig={images:{remotePatterns:[{protocol:'https',hostname:'bigohealth-images.s3.amazonaws.com'},{protocol:'https',hostname:'img.magicpin.com'},{protocol:'https',hostname:'lh3.googleusercontent.com'}]}};
export default nextConfig;

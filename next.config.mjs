/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ['utfs.io', 'files.edgestore.dev'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;

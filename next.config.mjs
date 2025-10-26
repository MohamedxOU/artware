import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },

            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/**',
            }
            // Add your own domain or other image sources here
            // {
            //     protocol: 'https',
            //     hostname: 'yourdomain.com',
            //     port: '',
            //     pathname: '/images/**',
            // },
        ],
    },
    async rewrites() {
        // Proxy API requests to the backend to avoid browser CORS
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        if (!apiBase) return [];
        return [
            {
                source: '/api/:path*',
                destination: `${apiBase}/:path*`,
            },
        ];
    },
};
 
export default withNextIntl(nextConfig);
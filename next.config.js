/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.jsx'],
  experimental: {
    // optimizeCss: true,
    // nextScriptWorkers: true,
  },
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.

  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config, { isServer }) {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': path.resolve(__dirname),
    //   '@src/': path.resolve(__dirname, 'src'),
    //   '@app/': path.resolve(__dirname, 'app'),
    // };
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp');
    }
    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
  redirects: async () => [
    // Home aliases
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
    {
      source: '/index',
      destination: '/',
      permanent: true,
    },
    {
      source: '/404',
      destination: '/',
      permanent: true,
    },

    // About aliases
    {
      source: '/about-me',
      destination: '/about',
      permanent: true,
    },
    {
      source: '/me',
      destination: '/about',
      permanent: true,
    },

    // Projects aliases (singular → plural, common names)
    {
      source: '/project',
      destination: '/projects',
      permanent: true,
    },
    {
      source: '/project/:id',
      destination: '/projects/:id',
      permanent: true,
    },
    {
      source: '/work',
      destination: '/projects',
      permanent: true,
    },
    {
      source: '/portfolio',
      destination: '/projects',
      permanent: true,
    },

    // Blog aliases (singular → plural)
    {
      source: '/blog',
      destination: '/blogs',
      permanent: true,
    },
    {
      source: '/blog/:id',
      destination: '/blogs/:id',
      permanent: true,
    },
    {
      source: '/articles',
      destination: '/blogs',
      permanent: true,
    },
    {
      source: '/posts',
      destination: '/blogs',
      permanent: true,
    },

    // Resume / CV
    {
      source: '/resume',
      destination: '/resume/resume.pdf',
      permanent: true,
    },
    {
      source: '/cv',
      destination: '/resume/resume.pdf',
      permanent: true,
    },

    // Contact (section lives on the home page)
    {
      source: '/contact',
      destination: '/',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;

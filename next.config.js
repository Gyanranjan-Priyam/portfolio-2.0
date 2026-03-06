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
      statusCode: 301,
    },
    {
      source: '/index',
      destination: '/',
      statusCode: 301,
    },
    {
      source: '/404',
      destination: '/',
      statusCode: 301,
    },

    // About aliases
    {
      source: '/about-me',
      destination: '/about',
      statusCode: 301,
    },
    {
      source: '/me',
      destination: '/about',
      statusCode: 301,
    },

    // Projects aliases (singular → plural, common names)
    {
      source: '/project',
      destination: '/projects',
      statusCode: 301,
    },
    {
      source: '/project/:id',
      destination: '/projects/:id',
      statusCode: 301,
    },
    {
      source: '/work',
      destination: '/projects',
      statusCode: 301,
    },
    {
      source: '/portfolio',
      destination: '/projects',
      statusCode: 301,
    },

    // Blog aliases (singular → plural)
    {
      source: '/blog',
      destination: '/blogs',
      statusCode: 301,
    },
    {
      source: '/blog/:id',
      destination: '/blogs/:id',
      statusCode: 301,
    },
    {
      source: '/articles',
      destination: '/blogs',
      statusCode: 301,
    },
    {
      source: '/posts',
      destination: '/blogs',
      statusCode: 301,
    },

    // Resume / CV
    {
      source: '/resume',
      destination: '/resume/resume.pdf',
      statusCode: 301,
    },
    {
      source: '/cv',
      destination: '/resume/resume.pdf',
      statusCode: 301,
    },

    // Contact (section lives on the home page)
    {
      source: '/contact',
      destination: '/',
      statusCode: 301,
    },
  ],
};

module.exports = nextConfig;

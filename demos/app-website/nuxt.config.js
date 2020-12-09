export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'School Circle - College student video social media platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1' },
      { name: 'description', content: 'School Circle - College student video social media platform', hid: 'description' },
      { name: 'keywords', content: 'School Circle, College student video social media platform' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '//cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.min.js' },
      // share install
      { src: '//webapi.amap.com/maps?v=1.4.10&key=1d0e4420bc5b99f19c1ce23dc634fc28&plugin=AMap.Geocoder' },
      { src: '//webapi.amap.com/ui/1.0/main.js?v=1.0.11' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/constants.scss',
    '@/assets/scss/index.scss',
    'swiper/swiper-bundle.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/swiper.js',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev }) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }

      if (!isDev) {
        // relative links, please.
        config.output.publicPath = './static/'
      }
    },
    // filenames: {
    //   // chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].js')
    //   // chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash:8].js')
    // }
  },

  router: {
    mode: 'hash',
    // base: 'app-website/',
    // base: 'blog/dist/app-website/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'page-not-found',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },

}

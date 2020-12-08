const server = {
  host: '0.0.0.0',
  port: 3001
}

module.exports = {
  mode: 'universal',

  server,

  target: 'static',

  buildDir: '../../dist/app-site',

  /*
  ** Headers of the page
  */
  head: {
    title: 'School Circle - College student video social media platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1' },
      { name: 'description', content: 'School Circle - College student video social media platform', hid: 'description' },
      { name: 'keywords', content: 'School Circle, College student video social media platform' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { src: '/js/baidu.js' },
      { src: '//cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.min.js' },
      // share install
      { src: '//webapi.amap.com/maps?v=1.4.10&key=1d0e4420bc5b99f19c1ce23dc634fc28&plugin=AMap.Geocoder' },
      { src: '//webapi.amap.com/ui/1.0/main.js?v=1.0.11' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // '@/assets/element-ui/reset.css',
    // '@/assets/element-ui/index.css',
    '@/assets/style/index.scss',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/element-ui.js',
    {
      src: '@/plugins/swiper.js',
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  // See https://github.com/nuxt-community/axios-module#options
  axios: {
    host: server.host,
    port: server.port,
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api': 'https://api.capricorncd.com:8787'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    // https://nuxtjs.org/api/configuration-build
    extractCSS: true
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'page-not-found',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  // npm run dev, Are you interested in participation? (Y/n)
  telemetry: false
}

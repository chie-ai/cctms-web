export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Campus Covid-19 Tracking Management System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main',
    '@/assets/css/header',
    '@/assets/css/auth-form',
    '@/assets/css/dashboard',
    '@/assets/css/add-user-form',
    '@/assets/css/alert',
    '@/assets/css/health-management',
    '@/assets/css/user-records',
    '@/assets/css/account',
    '@/assets/css/verify-health-condition',
    '@/assets/css/user-qrcode',
    '@/assets/css/userprofile.scss',
    '@/assets/css/vaccination-records.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/utils.js',
    '~/plugins/debounce.js',
    '~/plugins/vue-qrcode-component.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  ssr: false,
  target: 'server',

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    OAUTH_TOOLKIT_CLIENT_ID: process.env.OAUTH_TOOLKIT_CLIENT_ID,
    OAUTH_TOOLKIT_CLIENT_SECRET: process.env.OAUTH_TOOLKIT_CLIENT_SECRET
  },

  server: {
    port: 8080,
    host: 'localhost',
    timing: false
  }
}

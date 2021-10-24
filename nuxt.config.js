export default {
  // Global Page headers: https://go.nuxtjs.dev/config-head
  head() {
    return {
      title: 'ssi-blog',
      htmlAttrs: {
        lang: 'tr',
      },
      bodyAttrs: {
        class: 'sidebar-collapse',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'title', content: 'Ssi Blog v3' },
        { name: 'hostname', content: process.env.HOST_NAME },
        { name: 'expected-hostname', content: process.env.HOST_NAME },
        { name: 'theme-color', content: '#41b883' },
        { name: 'color-schema', content: 'default' },
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'og-locale', property: 'og:locale', content: 'tr_TR' },
        {
          hid: 'og-locale-alternative',
          property: 'og:locale:alernative',
          content: 'en_US',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700,200',
        },
        {
          rel: 'stylesheet',
          href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
        },
      ],
    }
  },

  loading: '~/components/Loading/ssiLoading.vue',
  globalName: 'ssiBlogV3',
  cli: {
    badgeMessages: ['Her şey hazır, haydi başlayalım!'],
  },
  globals: {
    id: 'ssiBlogV3',
  },
  env: {
    BASE_API_URL: 'http://localhost:20057/api',
    BASE_STATIC_API_URL: 'http://localhost:20057',
    HOST_NAME: 'samisalihibrahimbas.com.tr',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/scss/now-ui-kit.scss',
    '@/assets/demo/demo.css',
    '@/assets/scss/ssi.scss',
  ],

  // Plugins to run before rendering Page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/inversify-props.ts', '@/plugins/bootstrap.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  markdownit: {
    runtime: true,
  },
}

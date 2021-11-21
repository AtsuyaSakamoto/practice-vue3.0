import { NuxtConfig } from '@nuxt/types'
require('dotenv').config()

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'firebase',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    // [
    //   '@nuxtjs/firebase',
    //   {
    //     config: {
    //       apiKey: 'AIzaSyBhyxujYfrruPLpLLa4ma57gBlO6tcVQk0',
    //       authDomain: 'nuxt-example-b038b.firebaseapp.com',
    //       projectId: 'nuxt-example-b038b',
    //       storageBucket: 'nuxt-example-b038b.appspot.com',
    //       messagingSenderId: '905649210872',
    //       appId: '1:905649210872:web:44dc483ee14dc0cc31820d',
    //       measurementId: 'G-SSW1ZRFF38',
    //     },
    //     services: {
    //       auth: {
    //         persistence: 'local', // default
    //         initialize: {
    //           // onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
    //           // onAuthStateChangedAction: 'onAuthStateChangedAction',
    //           // subscribeManually: false,
    //         },
    //         // ssr: false,
    //         // emulatorPort: 9099,
    //         // emulatorHost: 'http://localhost',
    //       },
    //       firestore: true,
    //       storage: true,
    //     },
    //   },
    // ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
export default config

import { resolve } from 'path'
import routes from './src/pages'
import envs from './src/envs'
import serverMiddleware from './src/server'

const optionsBabel = {
  useBuiltIns: 'entry',
  targets: { ie: 11 }
}

export default {
  serverMiddleware,
  mode: 'universal',
  srcDir: 'src',
  middleware: 'stats',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    middleware: 'stats',
    extendRoutes: (nuxtRoutes, resolve) => {
      nuxtRoutes.splice(0, nuxtRoutes.length, ...routes.map((route) => {
        return {
          ...route,
          component: resolve(__dirname, route.component)
        }
      }))
    }
  },
  modules: [
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      resolve(__dirname, 'src/sass/main.scss')
    ]
  },
  loading: { color: '#fff' },
  plugins: [
  ],
  buildModules: [
  ],
  build: {
    optimizeCSS: true,
    cssSourceMap: false,
    extractCSS: false,
    cache: true,
    publicPath: envs.PUBLIC_PATH,
    extend (config, ctx) {
      // Test
      config.node = {
        fs: 'empty'
      }

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      babelrc: true,
      presets ({ isServer }) {
        return [
          ['@nuxt/babel-preset-app', optionsBabel]
        ]
      }
    },
    transpile: [
      'dotenv'
    ]
  }
}

require('dotenv').config()

export default Object.assign({
  PUBLIC_PATH: '/_nuxt/',
  API_BASE: 'https://google.com',
  API_PROXY_BASE: 'http://localhost:3000/api/'
}, process.env)

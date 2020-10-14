require('dotenv').config()

export default Object.assign({
  SITE_URL: '',
  BASE_URL_API: 'https://google.com',
  BASE_URL_PROXY: 'http://localhost:3000/api/'
}, process.env)

require('dotenv').config()

export default Object.assign({
  SITE_URL: '',
  BASE_API_URL: 'https://api.mocki.io/v1/',
  PROXY_API_URL: 'http://localhost:3000/api/'
}, process.env)

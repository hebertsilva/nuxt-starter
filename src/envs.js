require('dotenv').config()

export default Object.assign({
  SITE_URL: '',
  API_BASE_URL: 'https://api.mocki.io/v1/',
  API_PROXY_BASE: 'http://localhost:3000/api/'
}, process.env)

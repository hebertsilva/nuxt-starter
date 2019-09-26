import envs from '../../envs'
// import { withListRecaptcha } from '../../utils/recaptcha'
import resourcers from './../resources'

// Disable Redis caching (for debugging)
export const DISABLE_CACHE = false

// Load generate resourcers for template API
export const api = resourcers

// Config recaptcha Google
// export const recaptcha = {
//   url: 'https://www.google.com/',
//   secret: envs.CAPTCHA_SECRET_KEY,
//   enable: false,
//   paths: withListRecaptcha
// }

// Secrets keys
export const secrets = {
  session: envs.SESSION_SECRET,
  apiBase: envs.API_BASE,
  siteUrl: envs.SITE_URL,
  appId: envs.APP_ID,
  appSecret: envs.APP_SECRET
}

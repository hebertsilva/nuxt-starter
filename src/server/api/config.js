import envs from '../../envs'
import resourcers from './../resources'

// Disable Redis caching (for debugging)
export const DISABLE_CACHE = false

// Load generate resourcers for template API
export const api = resourcers

// Secrets keys
export const secrets = {
  baseUrl: envs.BASE_API_URL,
  siteUrl: envs.SITE_URL
}

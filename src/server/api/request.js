import consola from 'consola'
import client from './client'
import { api, DISABLE_CACHE } from './config'
import { base64Serialize } from './utils'
// import recaptcha from './recaptcha'

function translatePath (path) {
  // Convert list-siblings to listSiblings
  path = path.split('-')

  if (path.length === 1) {
    return path[0]
  } else if (path.length > 1) {
    const parts = path.slice(1).map((part) => {
      return `${part[0].toUpperCase()}${part.slice(1)}`
    })

    return `${path[0]}${parts.join('')}`
  } else {
    return path
  }
}

// request.validate = async function (req, res, apiMethod) {
//   // Recaptcha check, see ./recaptcha.js
//   if (!(await recaptcha(req, res, apiMethod))) {
//     return false
//   }

//   return true
// }

function genRequest (req, apiMethod) {
  // eslint-disable-next-line prefer-const
  let [resource, method] = apiMethod.split('/')
  method = translatePath(method)

  const payload = req.body.payload
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
  const params = {}
  const config = { params, headers }

  return { resource, method, config, payload }
}
export default async function request (req, res, apiMethod) {
  // Generate API request config
  const apiRequest = genRequest(req, apiMethod)
  const { resource, method, payload, config } = apiRequest
  const request = { payload, config }
  // const baseUrl = servicesApi[resource]
  const baseUrl = ''

  let response

  if (!DISABLE_CACHE && api[resource][method].ttl) {
    // Check Redis cache entry if ttl is set
    // Important: Redis based has installed
    const cacheId = `${resource}-${method}-${base64Serialize(payload)}`
    const cachedResponse = await res.redis.getJSON(cacheId)

    if (cachedResponse) {
      consola.info(`Cached: ${resource}.${method}(${payload})`)
      response = cachedResponse
    } else {
      response = await api[resource][method](client(baseUrl), request, req, res)
      const cachePayload = { status: response.status, data: response.data }
      res.redis.setJSON(cacheId, cachePayload, api[resource][method].ttl * 60)
    }
  } else {
    // Request fresh record otherwise
    response = await api[resource][method](client(baseUrl), request, req, res)
  }

  return response
}

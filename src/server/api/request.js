import consola from 'consola'
import client from './client'
import genHeaders from './headers'
import { api, DISABLE_CACHE } from './config'
import { base64Serialize, getRemoteAddress } from './utils'
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

function genRequest (req, res, apiMethod) {
  // eslint-disable-next-line prefer-const
  let [resource, method] = apiMethod.split('/')
  method = translatePath(method)

  const payload = req.body.payload
  const params = {
    ip: getRemoteAddress(req),
    userAgent: req.headers['user-agent']
  }
  const config = { params }

  // Inject params in case of GET requests
  if (payload[0] && payload[0].params) {
    Object.assign(config.params, payload[0].params)
  }

  config.headers = genHeaders(req)
  return { resource, method, config, payload }
}

export default async function request (req, res, apiMethod) {
  // Generate API request config
  const apiRequest = genRequest(req, res, apiMethod)
  const { resource, method, payload, config } = apiRequest
  const request = { payload, config }
  const proxy = payload.proxy

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
      response = await api[resource][method](client(proxy), request, req, res)
      const cachePayload = { status: response.status, data: response.data }
      res.redis.setJSON(cacheId, cachePayload, api[resource][method].ttl * 60)
    }
  } else {
    // Request fresh record otherwise
    response = await api[resource][method](client(proxy), request, req, res)
  }

  return response
}

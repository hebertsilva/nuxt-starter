import client from './client'
import { api, secrets } from './config'

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

function genRequest (req, apiMethod) {
  // eslint-disable-next-line prefer-const
  let [resource, method] = apiMethod.split('/')
  method = translatePath(method)

  const payload = req.body.payload
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    userAgent: req.headers['user-agent'],
    Date: new Date().toISOString()
  }

  const params = {}
  const config = { params, headers }
  return { resource, method, config, payload }
}

export default async function request (req, res, apiMethod) {
  const apiRequest = genRequest(req, apiMethod)
  const { resource, method, config, payload } = apiRequest
  const request = { payload, config }
  const baseUrl = secrets.baseUrl

  return await api[resource][method](client(baseUrl), request, req, res)
}

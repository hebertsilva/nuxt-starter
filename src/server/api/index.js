import write from './write'
import request from './request'
import { secrets } from './config'

export default async function (req, res, next) {
  // Checkt /api methods
  if (!req.url.match(/^\/api\/\w+/)) {
    return next()
  }

  // OPTIONS handler
  if (req.method === 'OPTIONS') {
    return write.options(res)
  }

  // Determine method call (/resource/method)
  const apiMethod = req.url.match(/^\/api\/([^?]+)\??/)[1]

  // Auth validations
  // if (!(await request.validate(req, res, apiMethod))) {
  //   return write.unauthorized(res)
  // }

  // Actually perform the backend request
  const response = await request(req, res, apiMethod)

  // Write response
  write.default(res, response.data, response.status, secrets.siteUrl)
}

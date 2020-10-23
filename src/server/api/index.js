import write from './write'
import request from './request'

export default async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return write.options(res)
  }

  // Determine method call (/resource/method)
  const apiMethod = req.url.match(/^\/([^?]+)\??/)[1]

  // Actually perform the backend request
  const { data, status } = await request(req, res, apiMethod)

  // Write response
  return write.default(res, data, status)
}

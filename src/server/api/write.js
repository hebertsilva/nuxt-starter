import { secrets } from './config'

function defaultResponse (res, data, status) {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')

  res.response = data
  res.statusCode = status
  res.end(JSON.stringify(data))
}

export default {
  default: defaultResponse,
  options (res) {
    res.setHeader('Access-Control-Allow-Origin', secrets.siteUrl)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    res.end()
  }
}

function defaultResponse (res, data, status = 200, origin = null) {
  res.setHeader('Accept', 'application/json')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
  }

  res.response = data
  res.statusCode = status
  res.writeHead(status)
  res.end(JSON.stringify(data))
}

export default {
  default: defaultResponse,
  options (res, origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    res.end()
  },
  unauthorized (res) {
    return defaultResponse(
      res,
      {
        error: true,
        message: 'Failed auth validation'
      },
      403
    )
  }
}

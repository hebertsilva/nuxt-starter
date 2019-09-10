// Utils for gateway
export function getRemoteAddress (req) {
  return req.connection.remoteAddress || req.socket.remoteAddress
}

export function encodeBase64 (data) {
  return Buffer.from(data).toString('base64')
}

export function base64Serialize (payload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

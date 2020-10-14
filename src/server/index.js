import json from './json'
import api from './api'
import session from './session'

export default [
  json,
  session,
  { path: '/api', handler: api }
]

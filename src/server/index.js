import json from './json'
import api from './api'

export default [
  json,
  { path: '/api', handler: api }
]

import axios from 'axios'
import { secrets } from './config'

// Client default by request API
export default (proxy = null) => {
  return axios.create({
    baseURL: proxy || secrets.apiBase,
    headers: {},
    validateStatus (status) {
      return status >= 200 && status <= 600
    }
  })
}

import axios from 'axios'

export default (baseURL) => {
  if (!baseURL) {
    return undefined
  }

  return axios.create({
    baseURL,
    headers: {},
    validateStatus (status) {
      return status >= 200 && status <= 600
    }
  })
}

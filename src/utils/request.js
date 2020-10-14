// import { resourcePermission } from './recaptcha'

// translateMethodToPath converts a string like
// service.doSomething() to service/do-something, so
// that it can be picked up by the API middleware in server/index.js
const translateMethodToPath = (name) => {
  return name.replace(/[A-Z]/g, l => `-${l.toLowerCase()}`).replace(/\./, '/')
}

// getData returns the results[] array if it's available,
// otherwise it returns the original JSON response
export function getData (response) {
  if (Array.isArray(response.data.results)) {
    return response.data.results
  } else {
    return response.data
  }
}

export default async function (
  { commit, dispatch, state },
  { apiMethod, payload, shouldDispatch = true }
) {
  commit('cleanErrors')
  commit('setRequestActive', apiMethod)

  try {
    const [resource, method] = apiMethod.split('.')
    const apiPath = translateMethodToPath(method)
    const requestData = {}

    requestData.payload = payload || {}

    // Create request client-side
    const response = await this.$axios.request({
      url: `${resource}/${apiPath}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: requestData,
      validateStatus: (status) => {
        return status >= 200 && status < 500
      }
    })

    if (response.status === 403) {
      return Promise.resolve({ ...response })
    } else {
      const { data, status } = response

      // Dispatch request action
      const dispatchPayload = { payload, data, status }
      const actionHandler = `${resource}/${method}`
      if (this.hasActionHandler(actionHandler) && shouldDispatch) {
        await dispatch(actionHandler, dispatchPayload)
      }

      if (status === 400) {
        commit('setErrors', { [apiMethod]: data })
      }

      commit('setRequestDone', apiMethod)

      return Promise.resolve({ data, status })
    }
  } catch (err) {
    commit('setErrors', { [apiMethod]: err })
  }
}

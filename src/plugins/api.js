
import Vuex from 'vuex'
import api from '~/api'

// extendStore adds methods to the Vuex Store
// Works for server and client-side requests
const extendStore = (ctx, obj) => {
  Object.keys(obj).forEach((key) => {
    // Note that all apps that use Vuex.Store in the
    // same global namespace will receive these methods
    Vuex.Store.prototype[key] = obj[key]
  })
}

export default (ctx, inject) => {
  const $api = api(ctx.store)

  extendStore(ctx, {
    $api,
    hasActionHandler (actionHandler) {
      return actionHandler in this._actions
    },
    api (apiMethod, payload, shouldDispatch = false) {
      return this.dispatch('api', { apiMethod, payload, shouldDispatch }, { root: true })
    }
  })

  inject('api', $api)
}

import Vue from 'vue'
import { parseErrors } from '../parses/errors'

export default {
  update (state, updatedState) {
    if (typeof updatedState === 'function') {
      updatedState = updatedState(state)
      for (const key in updatedState) {
        state[key] = updatedState[key]
      }
    } else if (updatedState !== null && typeof updatedState === 'object') {
      for (const key in updatedState) {
        state[key] = updatedState[key]
      }
    }
  },
  setRequestActive (state, call) {
    Vue.set(state.api.loading, call, true)
    state.api.active += 1
  },
  setRequestDone (state, call) {
    Vue.set(state.api.loading, call, false)
    state.api.active -= 1
  },
  setErrors (state, errors) {
    state.api.errors = parseErrors(errors)
  },
  cleanErrors (state) {
    state.api.errors = {}
  }
}

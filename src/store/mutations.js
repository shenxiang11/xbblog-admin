import * as types from './mutation-types'
import storage from 'store'

export default {
  [types.SET_TOKEN] (state, token) {
    storage.set('token', token)
    state.token = token
  },
  [types.SET_CATEGORIES] (state, categories) {
    state.categories = categories
  }
}

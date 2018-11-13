import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let plugins = []

debug && plugins.push(createLogger())

export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters,
  strict: true,
  plugins
})

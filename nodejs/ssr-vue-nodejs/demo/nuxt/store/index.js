/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/09 19:52
 */
import Vue from 'vue'
import Vuex from 'vuex'
import region from './modules/region'
import navBar from './modules/navigation-bar'

Vue.use(Vuex)

const store = () => (new Vuex.Store({
  modules: {
    region,
    navBar
  },
  actions: {
    nuxtServerInit({commit}, {req}) {
      let session = req.session || {}
      if (session.user) {
        commit('region', session.user)
      }
    }
  }
}))

export default store

/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/09 19:54
 */
const state = () => ({
  menuList: []
})

const mutations = {
  add(state, item) {
    state.menuList.push(item)
  }
}

const actions = {
  add: ({commit}, item) => {
    commit('add', item)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

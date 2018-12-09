/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2018/12/09 19:52
 */
const state = () => ({
  list: ['a', 'b']
})

const mutations = {
  add(state, item) {
    state.list.push(item)
  }
}

const actions = {
  add({commit}, item) {
    commit('add', item)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

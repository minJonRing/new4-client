import { login, logout, getInfo, collect, collectTopic } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { ajax } from '@/api/ajax'

const state = {
  token: getToken(),
  name: '',
  roles: [],
  userInfo: {},
  logo: '',
  collect: [],
  collectTopic: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOGO: (state, logo) => {
    state.logo = logo
  },
  SET_COLLECT: (state, collect) => {
    state.collect = collect
  },
  SET_COLLECT_TOPIC: (state, collectTopic) => {
    state.collectTopic = collectTopic
  }
}

const actions = {
  // 登录 获取token 登录凭证
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(response => {
        const { data } = response
        // 存储登录token
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(async response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { user } = data
        // 存储路由  用户登录信息
        // commit('SET_ROLES', roles)
        // commit('SET_NAME', user.nickName)
        commit('SET_USERINFO', user)
        resolve({ ...data })
      }).catch(error => {
        reject(error)
      })
      // 
      collect().then(({ data }) => {
        const { list } = data;
        commit('SET_COLLECT', list)
      })
      collectTopic().then(({ data }) => {
        const { list } = data;
        commit('SET_COLLECT_TOPIC', list)
      })
    })
  },
  setCollect({ commit }, data) {
    commit('SET_COLLECT', data)
  },
  setCollectTopic({ commit }, data) {
    commit('SET_COLLECT_TOPIC', data)
  },
  setInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
  },
  setLogo({ commit }, data) {
    commit('SET_LOGO', data)
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {

      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USERINFO', {})
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

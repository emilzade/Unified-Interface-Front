//import axios from 'axios'
//import jwtInterceptor from '../../shared/jwt.interceptor'

import VueCookies from 'vue-cookies'

const state = () => ({
  loginApiStatus: '',
  userProfile: localStorage.getItem('user'),
  token: VueCookies.get('token'),
  isAuthenticated: false,
  logOut: false,
})

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus
  },
  getUserProfile(state) {
    return state.userProfile
  },
  getLogout(state) {
    return state.logOut
  },
  getToken(state) {
    return state.token
  },
}

const actions = {
  async loginApi({ commit }, data) {
    const configObject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    }
    await fetch('http://172.20.10.183:7000/login/', configObject)
      .then((response) => response.json())
      .then(async (loginData) => {
        console.log(loginData)
        if (loginData.status == 200) {
          commit('setLoginApiStatus', 'success')
          localStorage.setItem('role', 'admin')
          localStorage.setItem('isAuthenticated', true)
          commit('setIsAuthenticated', true)

          var slicedDate =
            loginData.expires_at.slice(0, 10) +
            ' ' +
            loginData.expires_at.slice(11, 19)

          var parsedDate = new Date(slicedDate)
          var addedDate = parsedDate.setTime(
            parsedDate.getTime() + 4 * 60 * 60 * 1000,
          )
          var ceiledDate = Math.ceil((addedDate - new Date()) / 1000)
          console.log(ceiledDate)

          VueCookies.set('token', loginData.token, `${ceiledDate}s`)
          commit('setToken', loginData.token)

          await fetch(`http://172.20.10.183:7000/profile?email=${data.email}`, {
            method: 'Get',
            headers: {
              'Content-type': 'application/json;charset=UTF-8',
              Authorization: `Token ${loginData.token}`,
            },
          })
            .then(async (response) => await response.json())
            .then((userData) => {
              console.log(userData)
              localStorage.setItem('user', JSON.stringify(userData.results[0]))
              commit('setUserProfile', JSON.stringify(userData.results[0]))
            })
        } else {
          commit('setLoginApiStatus', 'failed')
          localStorage.setItem('role', '')
          localStorage.setItem('isAuthenticated', false)
          commit('setIsAuthenticated', false)
          VueCookies.set('token', '', '')
        }
      })
  },

  async userLogout({ commit, state }) {
    console.log(state.token)
    fetch('http://172.20.10.183:7000/logout', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Authorization: `Token ${state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    commit('setLogout', true)
    localStorage.setItem('isAuthenticated', 'false')
    localStorage.setItem('role', '')
    VueCookies.set('token', '')
    commit('setToken', '')
    localStorage.setItem('user', '')
  },
}

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data
  },
  setIsAuthenticated(state, data) {
    state.isAuthenticated = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUserProfile(state, data) {
    state.userProfile = data
  },

  setLogout(state, payload) {
    state.logOut = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

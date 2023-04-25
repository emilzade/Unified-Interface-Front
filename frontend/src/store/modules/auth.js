//import axios from 'axios'
//import jwtInterceptor from '../../shared/jwt.interceptor'
const state = () => ({
  loginApiStatus: '',
  userProfile: {
    id: 0,
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
  },
  logOut: false,
  token: '',
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
      .then((data) => {
        console.log(data)
        if (data.token.length > 0) {
          commit('setLoginApiStatus', 'success')
          commit('setToken', data.token)
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('role', 'admin')
        } else {
          commit('setLoginApiStatus', 'failed')
          commit('setToken', '')
          localStorage.setItem('isAuthenticated', 'false')
          localStorage.setItem('role', '')
          localStorage.setItem('token', '')
        }
      })
  },

  async userProfile({ commit }) {
    // const response = await jwtInterceptor
    //   .get('http://localhost:3000/user-profile', {
    //     withCredentials: true,
    //     credentials: 'include',
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // if (response && response.data) {
    //   commit('setUserProfile', response.data)
    // }
    const customUser = {
      id: 1,
      lastName: 'Testov',
      firstName: 'Test',
      email: 'test@mail.ru',
      phone: '100',
    }
    commit('setUserProfile', customUser)
  },
  async userLogout({ commit }) {
    commit('setLogout', true)
    localStorage.setItem('isAuthenticated', 'false')
    localStorage.setItem('role', '')
  },
}

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUserProfile(state, data) {
    const userProfile = {
      id: data.id,
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
    }
    state.userProfile = userProfile
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

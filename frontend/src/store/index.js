import { createStore } from 'vuex'
import authModule from '../store/modules/auth'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: true,
    paymentSearchObject: '',
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setPaymentSearchObject(state, data) {
      state.paymentSearchObject = data
      //console.log(state, data)
    },
  },
  actions: {},
  modules: { auth: authModule },
})

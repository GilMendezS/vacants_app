import Vue from 'vue'
import Vuex from 'vuex'
import vacantStore from './store/vacant';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vacantStore
  },
  state: {
    api_url: 'http://localhost:3000/api',
  },
  getters: {
    url_api(state){
      return state.api_url
    },
  }
})

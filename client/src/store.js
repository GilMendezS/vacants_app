import Vue from 'vue'
import Vuex from 'vuex'
import vacantStore from './store/vacant';
import message from './store/message';
import user from './store/user';
import status from './store/status';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vacantStore,
    message,
    user,
    status
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

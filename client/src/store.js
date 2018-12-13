import Vue from 'vue'
import axios from 'axios';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:3000/api',
    vacants: []
  },
  mutations: {
    setLoadedVacants(state, payload){
      state.vacants = payload;
    }
  },
  actions: {
    loadVacants({commit, getters}){
      axios.get(`${this.getters.url_api}/vacants`)
      .then(response => {
        commit('setLoadedVacants', response.data.data)
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  getters: {
    url_api(state){
      return state.api_url
    },
    vacants(state){
      return state.vacants
    }
  }
})

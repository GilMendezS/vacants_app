import Vue from 'vue'
import Vuex from 'vuex'
import vacantStore from './store/vacant';
import message from './store/message';
import user from './store/user';
import status from './store/status';
import contract from './store/contract';
import category from './store/category';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vacantStore,
    message,
    user,
    status,
    contract,
    category
  },
  state: {
    api_url: '/api',
    showingFormToCreate: false,
    makingApiCall: false
  },
  mutations: {
    enableFormToCreate(state){
      state.showingFormToCreate = true;
    },
    setHiddenFormToCreate(state){
      state.showingFormToCreate = false;
    },
    setStateApiCall(state, payload){
      state.makingApiCall = payload;
    }
  },
  actions: {
    showFormToCreate({commit}){
      commit('enableFormToCreate')
    },
    hideFormToCreate({commit}){
      commit('setHiddenFormToCreate')
    },
    statusApiCall({commit}, payload){
      commit('setStateApiCall', payload)
    }
  },
  getters: {
    url_api(state){
      return state.api_url
    },
    getStatusFormToCreate(state){
      return state.showingFormToCreate;
    },
    getStateApiCall(state){
      return state.makingApiCall;
    }
  }
})

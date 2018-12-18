import axios from 'axios';
import Vacant from '../models/vacant.js';
export default {
    namespaced: true,
    state: {
        vacants: [],
        current_vacant: new Vacant('', '', '','', '', '', '' ,'', ''),
        filtered_vacants: [],
        search: ''
    },
    mutations:{
        setLoadedVacants(state, payload){
            state.vacants = payload;
        },
        addNewVacant(state, payload){
            state.vacants = [...state.vacants, payload];
        },
        setCurrentVacant(state, payload){
            state.current_vacant = payload;
        },
        setFilteredResults(state, payload){
            state.vacants_result = payload;
        },
        updateSearch(state, payload){
            state.search = payload;
        },
        seFilteredResults(state, payload){
            state.filtered_vacants = payload;
        }
    },
    actions: {
        loadVacants({commit, rootGetters}){
            axios.get(`${rootGetters.url_api}/vacants`)
            .then(response => {
                commit('setLoadedVacants', response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        addVacant({dispatch, commit, rootGetters}, payload ){
            const headers = {
                headers: {
                    'Authorization': rootGetters['user/getToken'],
                }
            }
            axios.post(`${rootGetters.url_api}/vacants`, payload, headers)
            .then(response => {
                dispatch('message/addMessage', {
                    message: response.data.message,
                    type: 'success'
                }, { root: true });
                commit('addNewVacant', response.data.data);

            })
            .catch(err => {
                console.log(err)
            })
        },
        getVacant({dispatch, commit, rootGetters}, id){
            const headers = {
                headers: {
                    'Authorization': rootGetters['user/getToken'],
                }
            }
            axios.get(`${rootGetters.url_api}/vacants/${id}`, headers)
            .then(response => {
                commit('setCurrentVacant', response.data.data);
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    message: err.err,
                    type: 'error'
                })
            })
        },
        apply({dispatch, rootGetters}, id){
            const headers = {
                headers: {
                    'Authorization': rootGetters['user/getToken'],
                }
            }
            axios.post(`${rootGetters.url_api}/vacants/${id}/apply`, {}, headers)
            .then(response => {
                dispatch('message/addMessage', {
                    message: response.data.message,
                    type: 'success'
                }, { root: true });
            })
            .catch(err => {
                console.log(err)
            })
        },
        filterVacants({dispatch, commit, rootGetters, getters}){
            axios.get(`${rootGetters.url_api}/vacants/filter/${getters.getSearch}`)
            .then(response => {
                console.log(response.data)
                commit('seFilteredResults', response.data.data);
            })
            .catch(err => {
                console.log(err)
            })
        },
        modifySearch({commit}, payload){
            commit('updateSearch', payload);
        }
    },
    getters: {
        getVacants(state){
            return state.vacants;
        },
        getCurrentVacant(state){
            return state.current_vacant;
        },
        getSearch(state){
            return state.search;
        },
        getFilteredVacants(state){
            return state.filtered_vacants;
        }
    }

}
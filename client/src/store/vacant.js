import axios from 'axios';
export default {
    namespaced: true,
    state: {
        vacants: []
    },
    mutations:{
        setLoadedVacants(state, payload){
            state.vacants = payload;
        },
        addNewVacant(state, payload){
            state.vacants = [...state.vacants, payload];
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
        }
    },
    getters: {
        getVacants(state){
            return state.vacants;
        }
    }

}
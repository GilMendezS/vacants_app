import axios from 'axios';
export default {
    namespaced: true,
    state: {
        vacants: []
    },
    mutations:{
        setLoadedVacants(state, payload){
            state.vacants = payload;
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
        }
    },
    getters: {
        getVacants(state){
            return state.vacants;
        }
    }

}
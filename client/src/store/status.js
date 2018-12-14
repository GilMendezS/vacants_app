import axios from 'axios';
export default {
    namespaced: true,
    state: {
        statuses: []
    },
    mutations: {
        setLoadedStatuses(state, payload){
            state.statuses = payload;
        }
    },
    actions: {
        loadStatuses({commit, rootGetters}){
            axios.get(`${rootGetters.url_api}/statuses`)
            .then(response => {
                console.log(response.data);
                commit('setLoadedStatuses', response.data.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    getters: {
        getStatuses(state){
            return state.statuses;
        }
    }
}
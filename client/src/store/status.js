import axios from 'axios';
export default {
    namespaced: true,
    state: {
        statuses: []
    },
    mutations: {
        setLoadedStatuses(state, payload){
            state.statuses = payload;
        },
        setANewStatus(state, payload){
            state.statuses = [...state.statuses, payload]
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
        },
        addStatus({dispatch,commit, rootGetters}, payload){
            axios.post(`${rootGetters.url_api}/statuses`, payload)
            .then(response => {
                console.log(response.data)
                if(response.status === 200){
                    commit('setANewStatus', response.data.data);
                    dispatch('message/addMessage', {
                        message: response.data.message,
                        type: 'success'
                    }, { root: true });
                }
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
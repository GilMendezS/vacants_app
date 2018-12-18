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
        },
        removeFromStatuses(state, payload){
            state.statuses = state.statuses.filter( status => status._id != payload )
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
        },
        removeStatus({dispatch, commit, rootGetters}, payload){
            axios.delete(`${rootGetters.url_api}/statuses/${payload}`)
            .then(response => {
                console.log(response.data)
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        type: 'success',
                        message: response.data.message
                    }, { root: true })
                    commit('removeFromStatuses', payload)
                }
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    type: 'error',
                    message: err.message
                }, { root: true })
            })
        }
    },
    getters: {
        getStatuses(state){
            return state.statuses;
        }
    }
}
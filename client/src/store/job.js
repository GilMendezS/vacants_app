import axios from "axios";
export default {
    namespaced: true,
    state: {
        jobs: []
    },
    mutations: {
        setLoadedJobs(state, payload){
            state.jobs = payload;
        },
        addANewJob(state, payload){
            state.jobs = [...state.jobs, payload];
        },
        removeJob(state, id){
            state.jobs = state.jobs.filter( j => j._id != id);
        }
    },
    actions: {
        loadJobs({commit, rootGetters}){
            const headers = {
                headers: {
                    Authorization: rootGetters['user/getToken']
                }
            }
            axios.get(`${rootGetters.url_api}/jobs`, headers)
            .then(response => {
                if(response.status === 200){
                    commit('setLoadedJobs', response.data.data);
                }
            }) 
            .catch(err => {
                console.log(err)
            })
        },
        addJob({dispatch, rootGetters}, payload){
            const headers = {
                headers: {
                    Authorization: rootGetters['user/getToken']
                }
            }
            axios.post(`${rootGetters.url_api}/jobs`,payload, headers)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        message: response.data.message,
                        type: 'success'
                    }, { root: true })
                    commit('addANewJob', response.data.data);
                }
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    message: 'Error saving your job :(',
                    type: 'error'
                }, { root: true })
            })
        },
        deleteJob({dispatch, commit, rootGetters}, id){
            axios.delete(`${rootGetters.url_api}/jobs/${id}`)
            .then(response => {
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        message: response.data.message,
                        type: 'success'
                    }, { root: true })
                    commit('removeJob', id);
                }
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    message: 'Error removing the job :(',
                    type: 'error'
                }, { root: true })
            })
        }
    },
    getters: {
        getJobs(state){
            return state.jobs;
        }
    }
}
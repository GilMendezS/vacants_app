import axios from 'axios';
export default {
    namespaced: true,
    state: {
        contracts: []
    },
    mutations: {
        setLoadedContracts(state, payload){
            state.contracts = payload;
        },
        addNewContract(state, payload){
            state.contracts = [...state.contracts, payload];
        },
        setUpdatedContract(state, payload){
            const contractIndex = state.find( c => c._id === payload._id);
            if(contractIndex){
                state.contracts[contractIndex] = payload;
            }
        },
        removeContractWithId(state, payload){
            state.contracs = state.contracts.filter( c => c._id !== payload);
        }
    },
    actions: {
        loadContracts({dispatch, commit, rootGetters}, payload){
            axios.get(`${rootGetters.url_api}/contracts`)
            .then(response => {
                console.log(data)
                commit('setLoadedContracts', response.data.data);
            })
            .catch(err => {
                console.log(err);
            })
        },
        addContract({dispatch, commit, rootGetters}, payload){
            axios.post(`${rootGetters.url_api}/contracts`, payload)
            .then(response => {
                commit('addNewContract', response.data.data);
                dispatch('message/addMessage', {
                    message: response.data.message,
                    type: 'success'
                }, { root: true })
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateContract({dispatch, commit, rootGetters}, payload){
            axios.put(`${rootGetters.url_api}/contracts/${payload._id}`, payload)
            .then(response => {
                console.log(response)
                commit('setUpdatedContract', payload)
                dispatch('message/addMessage', {
                    message: response.data.message,
                    type: 'success'
                }, { root: true })
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeContract({ dispatch, commit, rootGetters }, id){
            axios.delete(`${rootGetters.url_api}/contracts/${id}`)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    commit('removeContractWithId', id)
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

    }
}
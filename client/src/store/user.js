import axios from 'axios';
export default {
    namespaced: true,
    state: {
        users: [],
        authenticated_user : null,
        token: null
    },
    mutations: {
        setToken(state, payload){
            state.token = payload;
            localStorage.setItem('jwt', payload)
        },
        signout(){
            localStorage.removeItem('jwt');
            state.token = null
        }
    },
    actions: {
        signin({commit}, payload, rootGetters){
            axios.post(`${rootGetters.url_api}/users/signin`)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    commit('setToken',  response.data.token)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        signup({commit}, payload, rootGetters){
            axios.post(`${rootGetters.url_api}/users/signup`)
            .then(response => {
                console.log(response.data)
                if(response.status === 200){

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
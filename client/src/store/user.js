import axios from 'axios';
import router from '../router';
export default {
    namespaced: true,
    state: {
        users: [],
        authenticated_user : null,
        token: null
    },
    mutations: {
        setToken(state, payload){
            localStorage.clear();
            state.token = payload;
            localStorage.setItem('jwt', payload)
        },
        signout(){
            localStorage.removeItem('jwt');
            state.token = null
        }
    },
    actions: {
        signin({dispatch,commit, rootGetters}, payload,){
            axios.post(`${rootGetters.url_api}/users/signin`, payload)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    commit('setToken',  response.data.token)
                    dispatch('message/addMessage', {
                        type:'success',
                        message: 'Login successfully!'
                    }, {root: true})
                    router.push('/vacants')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        signup({dispatch, commit, rootGetters}, payload, ){
            axios.post(`${rootGetters.url_api}/users/signup`, payload)
            .then(response => {
                console.log(response.data)
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        type: 'success',
                        message: 'User created succesfully!Now type your credentials'
                    }, { root: true})
                    router.push('/signin')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        syncToken({commit}, payload){
            commit('setToken', payload)
        }
    },
    getters: {
        getToken(state){
            return state.token;
        },
        getAuthenticatedUser(state){
            return state.authenticated_user;
        }
    }
}
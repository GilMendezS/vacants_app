import axios from 'axios';
import router from '../router';
export default {
    namespaced: true,
    state: {
        users: [],
        authenticated_user : null,
        token: null,
        profile: null
    },
    mutations: {
        setToken(state, payload){
            localStorage.clear();
            state.token = payload;
            localStorage.setItem('jwt', payload)
        },
        setUser(state, payload){
            state.authenticated_user = payload;
            localStorage.setItem('user', JSON.stringify(payload))
        },
        signout(state){
            localStorage.clear();
            state.token = null;
            state.authenticated_user = null;
        },
        setProfile(state, payload){
            state.profile = payload;
        }
    },
    actions: {
        signin({dispatch,commit, rootGetters}, payload,){
            axios.post(`${rootGetters.url_api}/users/signin`, payload)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    commit('setToken',  response.data.token)
                    commit('setUser',  response.data.user)
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
        updateUser({dispatch, commit, rootGetters}, payload){
            axios.put(`${rootGetters.url_api}/users/${payload._id}`, payload)
            .then(response => {
                console.log(payload)
                console.log(response.data)
                dispatch('message/addMessage', {
                    type: 'success',
                    message: response.data.message
                }, { root: true })
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    type: 'error',
                    message: err.message
                }, { root: true })
            })
        },
        syncToken({commit}, payload){
            commit('setToken', payload)
        },
        syncUser({commit}, payload){
            commit('setUser', payload);
        },
        signoutUser({commit}){
            commit('signout')
        },
        loadProfile({commit, rootGetters, getters}){
            const user_id = getters.getAuthenticatedUser._id;
            axios.get(`${rootGetters.url_api}/users/${user_id}`)
            .then(response => {
                console.log(response.data)
                commit('setProfile',response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    getters: {
        getToken(state){
            return state.token;
        },
        getAuthenticatedUser(state){
            return state.authenticated_user;
        },
        getProfile(state){
            return state.profile;
        }
    }
}
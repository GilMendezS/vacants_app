import axios from 'axios';
export default {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        setLoadedCategories(state, payload){
            state.categories = payload;
        },
        addNewCategory(state, payload){
            state.categories = [...state.categories, payload];
        },
        setUpdatedCategory(state, payload){
            const categoryIndex = state.categories.find( c => c._id === payload._id)
            if(categoryIndex){
                state.categories[categoryIndex] = payload;
            }
        },
        deleteCategory(state, id){
            state.categories = state.categories.filter(c => c._id != id);
        }
    },
    actions: {
        loadCategories({dispatch, commit, rootGetters}){
            axios.get(`${rootGetters.url_api}/categories`)
            .then(response => {
                console.log(response.data)
                commit('setLoadedCategories', response.data.data);
            })
            .catch(err => {
                console.log(err)
            })
        },
        addCategory({dispatch, commit, rootGetters}, payload){
            axios.post(`${rootGetters.url_api}/categories`, payload)
            .then(response => {
                console.log(response.data)
                commit('addNewCategory', response.data.data);
                dispatch('message/addMessage', {
                    message: response.data.messsage,
                    type: 'success'
                }, { root: true })
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
            
            })
        },
        updateCategory({dispatch, commit, rootGetters}, payload){
            axios.put(`${rootGetters.url_api}/categories/${payload._id}`, payload)
            .then(response => {
                console.log(response.data)
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        message: response.data.message,
                        type: 'success'
                    }, { root: true });
                    commit('setUpdatedCategory', payload)
                }
            })
            .catch(err => {
                dispatch('message/addMessage', {
                    message: err.message,
                    type: 'error'
                }, { root: true });
                console.log(err)
            })
        },
        removeCategory({dispatch, commit, rootGetters}, id){
            axios.delete(`${rootGetters.url_api}/categories/${id}`)
            .then(response => {
                console.log(response.data);
                if(response.status === 200){
                    dispatch('message/addMessage', {
                        message: response.data.message,
                        type: 'success'
                    }, { root: true });
                    commit('deleteCategory', id);
                }
            })
            .catch(err => {
                console.log(err)
                dispatch('message/addMessage', {
                    message: err.message,
                    type: 'error'
                });
            })
        }
    },
    getters: {
        getCategories(state){
            return state.categories;
        }
    }
}
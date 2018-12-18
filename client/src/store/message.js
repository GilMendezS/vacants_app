export default {
    namespaced: true,
    state: {
        showMessage: false,
        type: '',
        message:''
    },
    mutations: {
        showMessage(state, payload){
            state.showMessage = true;
            state.type = payload.type;
            state.message= payload.message;
        },
        hideMessage(state){
            state.showMessage = false;
            state.type = '';
            state.message = '';
        }
    },
    actions: {
        addMessage({commit}, payload){
            commit('showMessage', payload)
        },
        removeMessage({commit}){
            commit('hideMessage')
        }
    },
    getters: {
        getStateMessage(state){
            return state.showMessage;
        },
        getTypeMessage(state){
            return state.type;
        },
        getMessage(state){
            return state.message;
        }
    }
}
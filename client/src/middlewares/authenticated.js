import store from '../store';
export default (to, from, next) => {
    const authenticated = store.getters['user/getToken'];
    if(authenticated){
        next('/vacants')
    }
    else {
        next();
    }
}
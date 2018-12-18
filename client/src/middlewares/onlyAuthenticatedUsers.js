import store from '../store';
export default (to, from, next) => {
    const authenticated = store.getters['user/getToken'];
    const existsTokenInLocal = localStorage.getItem('jwt');
    if(existsTokenInLocal == null || existsTokenInLocal == undefined){
        next('/signin');
    }
    else {
        next();
    }
}
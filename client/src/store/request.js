import store from '../store';
import axios from 'axios';

export default {
    state: {
        axiosInstance: axios.create({
            headers: {
                Authorization: store.getters['user/getToken']
            }
        })
    },
    getters: {
        getAxiosInstance(state){
            return state.axiosInstance
        }
    }
}


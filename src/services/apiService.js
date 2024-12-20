import axios from "axios";
import {store} from '../store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const authToken = store?.getState().authToken;
        if (authToken) {
            config.headers['Authorization'] = 'Bearer ' + authToken
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    async function (error) {
      if ( error && error.response.status === 401 ) {
        const { dispatch } = store;
        dispatch({type: 'set', authToken: null})
        return Promise.reject(error)
      }
  
      return Promise.reject(error)
    }
)

export default axiosInstance;

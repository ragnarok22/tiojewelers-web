import axios from 'axios'
import Server_URL from '../config'

export const BASE_API = Server_URL || 'http://localhost:8000/api';
axios.defaults.baseURL = BASE_API;

export let outPut = null;
const TOKEN_KEY = 'ACCESS_TOKEN'

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}
export const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = async ({ setCurrentUser }) => {
    try {
        let { status, data } = await axios.get("/profile");
        if (status === 204) {
            setCurrentUser(data)
            return true
        }
    } catch (error) {
        console.log('error ', error)
        deleteToken()
        return false;
    }
}

export const initAxiosInterceptors = () => {
    axios.interceptors.request.use(
        config => {
            const token = getToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }, error => {
            return Promise.reject(error)
        })

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error?.response?.status === 401) {
                outPut = "Wrong user or password"
                //outPut = error?.response?.data.message
            } else if (error?.response?.status === 403) {
                outPut = "You're not allowed to login in this site"
                //outPut = error?.response?.data.message
            } else {
                outPut = "It had ocurred an error"
                return Promise.reject(error)
            }
        }
    )
}
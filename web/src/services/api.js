import axios from 'axios';
import { getToken, logout } from './auth'

export const baseURL = "http://172.16.13.27:5000";
export const baseURLFront = window.location.protocol + "//" + window.location.host;

const api = axios.create({
  baseURL: baseURL
});



api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

api.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    if (401 === error.response.status) {
      logout();
      localStorage.setItem('isInvalid', "invalido");
      window.location = "/login";
    } else {
        return Promise.reject(error);
    }
});

export default api;
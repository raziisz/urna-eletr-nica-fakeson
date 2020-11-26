import axios from 'axios';
import { getToken } from './auth'

export const baseURL = "http://localhost:5000";

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

export default api;
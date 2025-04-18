import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store/store';
import {logoutUser} from '../app/reducers/authSlice';

const TOKEN_KEY = 'access_token';
const API_BASE_URL = process.env.API_BASE_URL;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const authApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

authApiClient.interceptors.request.use(
  async config => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      try {
        const tokenFromStorage = await AsyncStorage.getItem(TOKEN_KEY);
        if (tokenFromStorage) {
          config.headers.Authorization = `Bearer ${tokenFromStorage}`;
        } else {
          console.warn('No access token found.');
        }
      } catch (e) {
        console.error(
          'Could not retrieve token from AsyncStorage for request',
          e,
        );
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authApiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn('401 Unauthorized. Logging out user.');
      originalRequest._retry = true;

      try {
        await store.dispatch(logoutUser()).unwrap();
      } catch (logoutError) {
        console.error('Failed to automatically logout user:', logoutError);
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export {apiClient, authApiClient};

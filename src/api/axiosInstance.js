import axios from 'axios';
import {API_BASE} from '@env';
import {useAuthStore} from '../stores/useAuthStore';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: tự thêm token từ MMKV
axiosInstance.interceptors.request.use(
  config => {
    try {
      const token = useAuthStore.getState().accessToken;

      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.warn('Error adding token to request', err);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;

    console.error('API Error:', error?.response || error);
    if (status === 401) {
      console.warn('Token hết hạn / không hợp lệ → auto logout');

      const store = useAuthStore.getState();
      store.clearAuth();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

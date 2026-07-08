import axios from 'axios';

const defaultApiUrl = import.meta.env.DEV
  ? 'http://localhost:3001/api'
  : 'https://smart-tourism-recommendation-system.onrender.com/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultApiUrl,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartTravelToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApiError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return fallback;
};

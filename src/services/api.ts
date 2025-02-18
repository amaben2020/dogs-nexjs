import { TSearchParams } from '@/hooks/useDogs';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('🚨 401 Error: Token has expired, Redirecting to login...');
      window.location.href = '/login';
      toast.loading('Logging out user');
    }
    return Promise.reject(error);
  }
);

export const login = async (name: string, email: string) => {
  const response = await api.post('/auth/login', { name, email });
  return response;
};

export const fetchBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params: TSearchParams) => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const fetchDogsByIds = async (ids: string[]) => {
  const response = await api.post('/dogs', ids);
  return response.data;
};

export const generateMatch = async (ids: string[]) => {
  const response = await api.post('/dogs/match', ids);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export default api;

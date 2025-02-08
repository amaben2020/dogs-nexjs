import axios from 'axios';

// TODO: move to .env file
const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const login = async (name: string, email: string) => {
  const response = await api.post('/auth/login', { name, email });
  return response;
};

export const fetchBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params: any) => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const fetchDogsByIds = async (ids: string[]) => {
  console.log('ids', ids);
  const response = await api.post('/dogs', ids);
  return response.data;
};

export const generateMatch = async (ids: string[]) => {
  const response = await api.post('/dogs/match', ids);
  return response.data;
};

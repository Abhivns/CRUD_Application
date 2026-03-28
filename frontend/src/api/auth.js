import apiClient from './client';

export async function registerUser(payload) {
  const { data } = await apiClient.post('/register', payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await apiClient.post('/login', payload);
  return data;
}

export async function fetchProfile() {
  const { data } = await apiClient.get('/profile');
  return data;
}

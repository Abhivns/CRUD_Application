import apiClient from './client';

export async function fetchTeachers() {
  const { data } = await apiClient.get('/teachers');
  return data;
}

export async function fetchTeacher(id) {
  const { data } = await apiClient.get(`/teachers/${id}`);
  return data;
}

export async function createTeacher(payload) {
  const { data } = await apiClient.post('/teachers', payload);
  return data;
}

export async function updateTeacher(id, payload) {
  const { data } = await apiClient.put(`/teachers/${id}`, payload);
  return data;
}

export async function deleteTeacher(id) {
  const { data } = await apiClient.delete(`/teachers/${id}`);
  return data;
}

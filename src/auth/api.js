const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => ({ message: 'Invalid server response.' }));
  if (!response.ok) throw new Error(data.message || 'Request failed.');
  return data;
}

export const signup = payload =>
  request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });

export const login = payload =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });

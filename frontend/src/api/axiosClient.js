import axios from 'axios';

// One configured axios instance, reused everywhere. Setting baseURL
// once here means every API call file just writes api.get('/health')
// instead of repeating the full backend URL every time.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// A response interceptor runs on EVERY response, success or failure,
// before your calling code sees it. Here it's used to unwrap axios's
// error shape into a plain message string, so calling code can just
// read `error.message` instead of digging through
// `error.response.data.message` every single time.
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

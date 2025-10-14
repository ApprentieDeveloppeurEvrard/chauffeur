import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  setToken: (token) => {
    localStorage.setItem('token', token)
    try { window.dispatchEvent(new Event('auth-changed')) } catch {}
  },
  getToken: () => localStorage.getItem('token'),
  clear: () => {
    localStorage.removeItem('token')
    try { window.dispatchEvent(new Event('auth-changed')) } catch {}
  },
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export function getCurrentUserRole() {
  const token = auth.getToken()
  if (!token) return null
  const payload = parseJwt(token)
  return payload?.role || null
}

export const apiUtils = {
  getApiUrl: () => API_URL,
  getApiBaseUrl: () => API_BASE_URL,
  healthCheck: () => axios.get(`${API_URL}/health`),
}

export const authApi = {
  register: (payload) => api.post('/auth/register', payload),
  login: async (payload) => {
    const res = await api.post('/auth/login', payload)
    const token = res?.data?.token
    if (token) auth.setToken(token)
    const role = getCurrentUserRole()
    return { token, role }
  },
  logout: () => auth.clear(),
}

export default api



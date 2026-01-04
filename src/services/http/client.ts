import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { API_CONFIG } from '@/config/api'

export function createClientHttpClient(baseURL: string = API_CONFIG.baseURL): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: API_CONFIG.timeout,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance
}

export const clientHttpClient = createClientHttpClient()

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { API_CONFIG } from '@/config/api'
import type { ApiResponse, AppError } from '@/types'

function toAppError(error: any): AppError {
  if (error && error.code && error.message) return error as AppError

  if (error.response) {
    return {
      code: `HTTP_${error.response.status}`,
      message: error.response.data?.message || error.message,
      statusCode: error.response.status,
      details: error.response.data,
    }
  }
  if (error.request) {
    return { code: 'NETWORK_ERROR', message: 'Network error occurred', details: error }
  }
  return { code: 'UNKNOWN_ERROR', message: error.message || 'An unknown error occurred', details: error }
}

export function createClientApi(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_CONFIG.baseURL, // 注意：client 侧最好用 NEXT_PUBLIC_*
    timeout: API_CONFIG.timeout,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  instance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => Promise.reject(toAppError(error))
  )

  return instance
}
import type { ApiResponse } from '@/types'
import type { AxiosRequestConfig } from 'axios'
import { createClientApi } from './client'

const clientApi = createClientApi()

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    (await clientApi.get<ApiResponse<T>>(url, config)).data,

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    (await clientApi.post<ApiResponse<T>>(url, data, config)).data,

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    (await clientApi.put<ApiResponse<T>>(url, data, config)).data,

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    (await clientApi.patch<ApiResponse<T>>(url, data, config)).data,

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    (await clientApi.delete<ApiResponse<T>>(url, config)).data,
}
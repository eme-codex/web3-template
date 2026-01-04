import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { clientHttpClient } from './client'
import { serverHttpClient } from './server'

export interface HttpService {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
}

export function createHttpService(client: AxiosInstance): HttpService {
  return {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      (await client.get<T>(url, config)).data,
    post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      (await client.post<T>(url, data, config)).data,
    put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      (await client.put<T>(url, data, config)).data,
    patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      (await client.patch<T>(url, data, config)).data,
    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
      (await client.delete<T>(url, config)).data,
  }
}

export const httpService = createHttpService(clientHttpClient)
export const serverHttpService = createHttpService(serverHttpClient)

export { clientHttpClient, serverHttpClient }

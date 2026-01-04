import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { API_CONFIG } from '@/config/api'

export function createServerHttpClient(baseURL: string = API_CONFIG.baseURL): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: API_CONFIG.timeout,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const serverHttpClient = createServerHttpClient()

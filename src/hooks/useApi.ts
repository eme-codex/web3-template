'use client'

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { apiService } from '@/services/api'
import type { ApiResponse, AppError } from '@/types'

export function useApiQuery<T>(
  queryKey: readonly unknown[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, AppError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiResponse<T>, AppError>({
    queryKey,
    queryFn: ({ signal }) => apiService.get<T>(url, { signal }),
    ...options,
  })
}

export function usePost<T, V = any>(
  url: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, AppError, V>, 'mutationFn'>
) {
  return useMutation<ApiResponse<T>, AppError, V>({
    mutationFn: (variables) => apiService.post<T>(url, variables),
    ...options,
  })
}

export function usePut<T, V = any>(
  url: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, AppError, V>, 'mutationFn'>
) {
  return useMutation<ApiResponse<T>, AppError, V>({
    mutationFn: (variables) => apiService.put<T>(url, variables),
    ...options,
  })
}

export function useDelete<T>(
  url: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, AppError, void>, 'mutationFn'>
) {
  return useMutation<ApiResponse<T>, AppError, void>({
    mutationFn: () => apiService.delete<T>(url),
    ...options,
  })
}

export function useInvalidateQuery() {
  const queryClient = useQueryClient()
  return (key: readonly unknown[]) =>
    queryClient.invalidateQueries({ queryKey: key })
}
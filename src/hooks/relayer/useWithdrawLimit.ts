import { useQuery } from '@tanstack/react-query'
import { getWithdrawLimit } from '@/api/relayer'
import { relayerKeys } from '@/lib/queryKeys'
import type { AppError } from '@/types'
import type { RelayerWithdrawLimitResponse } from '@/types/relayer'

export function useWithdrawLimit(address?: string) {
  return useQuery<RelayerWithdrawLimitResponse, AppError>({
    queryKey: relayerKeys.withdrawLimit(address),
    queryFn: ({ signal }) => {
      if (!address) {
        return Promise.reject(new Error('Missing address'))
      }
      return getWithdrawLimit(
        {
          target_chain: '3',
          token_type: '4',
          target_address: address,
          source_chain: '13',
          source_address: address,
        },
        signal
      )
    },
    enabled: Boolean(address),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  })
}

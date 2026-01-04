import { httpService, type HttpService } from '@/services/http'
import { RELAYER_BASE_URL } from '@/config/api'
import type { RelayerWithdrawLimitParams, RelayerWithdrawLimitResponse } from '@/types/relayer'

export function getWithdrawLimit(
  params: RelayerWithdrawLimitParams,
  signal?: AbortSignal,
  http: HttpService = httpService
): Promise<RelayerWithdrawLimitResponse> {
  return http.get<RelayerWithdrawLimitResponse>(
    `${RELAYER_BASE_URL}/relayer/withdraw/limit_amount`,
    { params, signal }
  )
}

export const relayerKeys = {
  all: ['relayer'] as const,
  withdrawLimit: (address?: string) => [...relayerKeys.all, 'withdraw-limit', address] as const,
}

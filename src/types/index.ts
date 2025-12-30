// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// User Types
export interface User {
  id: string;
  address: string;
  email?: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Web3 Types
export interface WalletInfo {
  address: string;
  chainId: number;
  isConnected: boolean;
  balance?: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  data?: string;
  gasPrice?: string;
  gasLimit?: string;
  nonce?: number;
  blockNumber?: number;
  status?: 'pending' | 'success' | 'failed';
  timestamp?: number;
}

export interface ContractCall {
  address: string;
  functionName: string;
  args: any[];
  abi: any;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  statusCode?: number;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: AppError | null;
}

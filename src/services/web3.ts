import { getBalance, readContract } from 'wagmi/actions';
import { Address, formatUnits, parseEther } from 'viem';
import { CURRENT_NETWORK } from '@/config/networks';

export class Web3Service {
  /**
   * Get wallet balance
   */
  async getBalance(address: Address, config: any) {
    try {
      const balance = await getBalance(config, {
        address,
        chainId: CURRENT_NETWORK.id,
      });
      return balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  /**
   * Read contract data
   */
  async readContractData(config: any, params: {
    address: Address;
    abi: any;
    functionName: string;
    args?: any[];
  }) {
    try {
      const result = await readContract(config, {
        address: params.address,
        abi: params.abi,
        functionName: params.functionName,
        args: params.args || [],
        chainId: CURRENT_NETWORK.id,
      });
      return result;
    } catch (error) {
      console.error('Error reading contract:', error);
      throw error;
    }
  }

  /**
   * Format balance
   */
  formatBalance(balance: bigint, decimals: number = 18): string {
    return formatUnits(balance, decimals);
  }

  /**
   * Parse ether
   */
  parseEther(value: string): bigint {
    return parseEther(value);
  }

  /**
   * Validate address
   */
  isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Shorten address
   */
  shortenAddress(address: string, chars: number = 4): string {
    if (!this.isValidAddress(address)) return address;
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }
}

export const web3Service = new Web3Service();

import { Web3, Contract, ContractAbi } from 'web3';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Connection as SolanaConnection } from '@solana/web3.js';

import { DataResponse, LIST_CHAIN_SUPPORT } from '../../../common';
import { GetBalancesParams } from '../../../type';

export interface ApproveParams {
  ownerAddress: string;
  tokenAddress: string;
  spenderAddress: string;
  connector: any;
}

export interface SigPermitErc20Params {
  ownerAddress: string;
  tokenAddress: string;
  spenderAddress: string;
  amount: string;
  connector: any;
}

export interface TokenAllowanceParams {
  ownerAddress: string;
  tokenAddress: string;
  spenderAddress: string;
}

export abstract class AbstractServices {
  protected abstract connection:
    | Web3
    | CosmWasmClient
    | SolanaConnection
    | null;

  abstract getBalance(params?: GetBalancesParams): Promise<string>;
  abstract getContract<TAbi extends ContractAbi>(
    ABI: TAbi,
    contractAddress: string,
    chain?: string,
  ): Contract<TAbi> | null;
  abstract getClient(
    chain: LIST_CHAIN_SUPPORT,
    rpcs?: { [key: string]: string },
  ): Web3 | Promise<CosmWasmClient> | SolanaConnection;
  abstract getTokenAllowance(
    params: TokenAllowanceParams,
  ): Promise<DataResponse>;
  abstract getNonce(address: string): Promise<any>;
  abstract approveToken(params: ApproveParams): Promise<DataResponse>;
  abstract isValidAddress(address: string): boolean;
  abstract isNativeToken(address: string): boolean;
}

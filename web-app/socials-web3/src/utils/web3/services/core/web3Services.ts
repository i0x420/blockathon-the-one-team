import { Contract, ContractAbi } from 'web3';

import { EvmServices } from '../evm';

import {
  AbstractServices,
  ApproveParams,
  TokenAllowanceParams,
} from '../abstract/abstractServices';

import { get } from 'lodash';
import { CHAIN_KIND, LIST_CHAIN_SUPPORT } from '../../../common';
import { GetBalancesParams } from '../../../type';
import { getChainData, getChainKind } from '../../functions';
// import { TomoServices } from '../tomo';

export class Web3Services {
  static instance: Web3Services;
  chain: LIST_CHAIN_SUPPORT;
  service: AbstractServices;
  rpc: string;

  constructor(chain: LIST_CHAIN_SUPPORT) {
    if (get(Web3Services, 'instance.chain') === chain) {
      const currentChain = Web3Services.instance.chain;
      Web3Services.instance.rpc = this.getRpcByChain(currentChain);

      return Web3Services.instance;
    }

    this.chain = chain;
    // @ts-ignore
    this.rpc = this.getRpcByChain(chain);
    this.service = this.initService();
    Web3Services.instance = this;
  }

  initService() {
    const chain = this.chain;
    const chainKind = getChainKind(chain);
    const rpc = this.rpc;

    // if (chain === CHAIN_TYPE.tomo) {
    //   return new TomoServices(chain, rpc);
    // }

    switch (chainKind) {
      case CHAIN_KIND.EVM:
        return new EvmServices(chain, rpc);
      // case CHAIN_KIND.COSMWASM:
      //   return new CosmwasmServices(chain, rpc);
      // case CHAIN_KIND.SOLANA:
      //   return new SolanaServices(chain, rpc);
      default:
        throw `${chain} is not supported`;
    }
  }

  getRpcByChain(chain: LIST_CHAIN_SUPPORT): string {
    const chainData = getChainData(chain);
    const rpcFromChainData = get(chainData, 'rpcURL');

    // return rpcFromChainData;

    try {
      const rpcsFromLocal = localStorage.getItem('rpcs');
      if (!rpcsFromLocal) return rpcFromChainData;

      return JSON.parse(rpcsFromLocal)[this.chain] || rpcFromChainData;
    } catch (error) {
      return rpcFromChainData;
    }
  }

  getClient() {
    return this.service.getClient(this.chain);
  }

  async getBalance({ ownerAddress, tokenAddress }: GetBalancesParams) {
    return await this.service.getBalance({ ownerAddress, tokenAddress });
  }

  async getTokenAllowance({
    ownerAddress,
    tokenAddress,
    spenderAddress,
  }: TokenAllowanceParams) {
    return await this.service.getTokenAllowance({
      ownerAddress,
      tokenAddress,
      spenderAddress,
    });
  }

  getContract<TAbi extends ContractAbi>(
    abi: TAbi,
    contractAddress: string,
  ): Contract<TAbi> {
    //@ts-ignore
    return this.service.getContract(abi, contractAddress);
  }

  async getNonce(address: string) {
    return await this.service.getNonce(address);
  }

  async approveToken({
    ownerAddress,
    tokenAddress,
    spenderAddress,
    connector,
  }: ApproveParams) {
    return await this.service.approveToken({
      ownerAddress,
      tokenAddress,
      spenderAddress,
      connector,
    });
  }

  isValidAddress(address: string) {
    return this.service.isValidAddress(address);
  }

  isNativeToken(address: string) {
    return this.service.isNativeToken(address);
  }
}

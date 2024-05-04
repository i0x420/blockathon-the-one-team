import { ContractAbi, Web3, validator } from 'web3';

import {
  AbstractServices,
  ApproveParams,
  TokenAllowanceParams,
} from '../abstract/abstractServices';
import { ERC20ABI } from '../../abi';

import { GetBalancesParams } from '../../../type';
import {
  ADDRESS_ZERO,
  CHAIN_DATA,
  CHAIN_TYPE,
  LIST_CHAIN_SUPPORT,
  genSuccessResponse,
} from '../../../common';
import * as Web3Old from 'web3-old';

export class EvmServices extends AbstractServices {
  protected connection: Web3;
  protected _rpc: string;
  MAX_INT =
    '115792089237316195423570985008687907853269984665640564039457584007913129639935';

  constructor(chain: LIST_CHAIN_SUPPORT, rpc: string) {
    super();
    this._rpc = rpc;
    this.connection = this.getClient(chain);
  }

  getClient = (chain: LIST_CHAIN_SUPPORT): Web3 => {
    const chainData = CHAIN_DATA[chain];

    if (!chainData) {
      throw new Error(`${chain} is not ready!`);
    }
    const newWeb3: any = chain === CHAIN_TYPE.tomo ? Web3Old : Web3;

    if (!this.connection) {
      const rpcUrl = this._rpc || (chainData.rpcURL as string);
      const client = new newWeb3(new newWeb3.providers.HttpProvider(rpcUrl));
      this.connection = client;
      return client;
    }
    return this.connection;
  };

  async getBalance({ ownerAddress, tokenAddress }: GetBalancesParams) {
    try {
      const client = this.connection;

      // Include tokenAddress if want to get balance of ERC-20 token
      if (tokenAddress && tokenAddress !== ADDRESS_ZERO) {
        const contract = this.getContract(ERC20ABI, tokenAddress);
        const balance = await contract.methods.balanceOf(ownerAddress).call();

        return balance.toString();
      }

      // Main Balance
      const latestBlock = 'latest';
      const balance = await client.eth.getBalance(ownerAddress, latestBlock);

      return balance.toString();
    } catch (err) {
      // throw err;
      return '0';
    }
  }

  getContract<TAbi extends ContractAbi>(abi: TAbi, contractAddress: string) {
    const client = this.connection;
    const contract = new client.eth.Contract(abi, contractAddress);

    return contract;
  }

  // Token functions
  async getTokenAllowance({
    tokenAddress,
    spenderAddress,
    ownerAddress,
  }: TokenAllowanceParams) {
    try {
      const contract = this.getContract(ERC20ABI, tokenAddress);
      const allowance = (
        await contract.methods.allowance(ownerAddress, spenderAddress).call()
      ).toString();

      return genSuccessResponse(allowance);
    } catch (err) {
      throw err;
    }
  }

  async approveToken({
    ownerAddress,
    tokenAddress,
    spenderAddress,
    connector,
  }: ApproveParams) {
    try {
      const contract = this.getContract(ERC20ABI, tokenAddress);
      const approveAbi = contract.methods
        .approve(spenderAddress, this.MAX_INT)
        .encodeABI();

      const txn = {
        from: ownerAddress,
        to: tokenAddress,
        data: approveAbi,
        isWaitDone: true,
      };

      const txnHash = await connector.sendTransaction(txn);
      return genSuccessResponse(txnHash);
    } catch (err) {
      throw err;
    }
  }

  async getNonce(address: string) {
    return await this.connection.eth.getTransactionCount(address);
  }

  // Util functions
  checksumAddress(address: string) {
    return this.connection.utils.toChecksumAddress(address);
  }

  isValidAddress(address: string) {
    if (!address) return false;

    // Using validator provided by web3.js in new version
    return validator.isAddress(address, true);
  }

  isNativeToken(address: string) {
    return this.checksumAddress(address) === ADDRESS_ZERO;
  }
}

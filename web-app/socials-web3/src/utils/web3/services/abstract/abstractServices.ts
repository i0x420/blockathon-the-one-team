import { Contract, ContractAbi, Web3 } from "web3";

import { DataResponse, LIST_CHAIN_SUPPORT } from "../../../common";
import { GetBalancesParams } from "../../../type";
import { WalletContextState } from "@coin98-com/wallet-adapter-react";

export interface ApproveParams {
  ownerAddress: string;
  tokenAddress: string;
  spenderAddress: string;
  connector: WalletContextState;
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
  protected abstract connection: Web3 | null;

  abstract getBalance(params?: GetBalancesParams): Promise<string>;
  abstract getContract<TAbi extends ContractAbi>(
    ABI: TAbi,
    contractAddress: string,
    chain?: string
  ): Contract<TAbi> | null;
  abstract getClient(
    chain: LIST_CHAIN_SUPPORT,
    rpcs?: { [key: string]: string }
  ): Web3;
  abstract getTokenAllowance(
    params: TokenAllowanceParams
  ): Promise<DataResponse>;
  abstract getNonce(address: string): Promise<any>;
  abstract approveToken(params: ApproveParams): Promise<DataResponse>;
  abstract isValidAddress(address: string): boolean;
  abstract isNativeToken(address: string): boolean;
}

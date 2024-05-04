import { LIST_CHAIN_SUPPORT } from '../common';

export interface Token {
  id: string; // Generated Id From Information
  name: string;
  symbol: string;
  chain: string;
  decimal: number;
  balance: string;
  rawBalance?: string;
  image: string;
  address?: string; // Token address, leave as blank if it's maincoin
}

export interface GetBalancesParams {
  ownerAddress: string;
  tokenAddress?: string;
  denom?: string;
  chain?: LIST_CHAIN_SUPPORT;
}

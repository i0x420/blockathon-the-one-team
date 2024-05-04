import { get } from "lodash";
import {
  CHAIN_DATA,
  CHAIN_ID_TO_CHAIN,
  CHAIN_KIND,
  CHAIN_TO_CHAIN_ID
} from "../../common/constants";

export const getChainIdFromChain = (chain: string) =>
  get(CHAIN_TO_CHAIN_ID, chain);

export const getChainFromChainId = (chain: string) => {
  return get(CHAIN_ID_TO_CHAIN, chain);
};

export const getChainKind = (chain: string): CHAIN_KIND =>
  get(CHAIN_DATA[chain], "kind", CHAIN_KIND.UNKNOWN);

export const getNumChainId = (chain: string) =>
  get(CHAIN_DATA[chain], "numChainId", 137);

export const getChainData = (chain: string) => CHAIN_DATA[chain];

export const getChainSymbol = (chain: string) =>
  get(CHAIN_DATA[chain], "symbol", "");

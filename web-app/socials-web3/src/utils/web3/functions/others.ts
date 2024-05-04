import Web3 from "web3";

import {
  ADDRESS_ZERO,
  CHAIN_KIND,
  WRAPPER_SOL_ADDRESS,
} from "../../common/constants";
import { getChainKind } from "./getChainData";

// helper functions
export const checksumAddress = (address: string) => {
  try {
    return Web3.utils.toChecksumAddress(address);
  } catch (error) {
    return address;
  }
};

export const checkNativeAddress = (tokenAddress: string) => {
  const nativeCosmWasmDenom = ["usei", "inj"];

  if (
    tokenAddress === "" ||
    tokenAddress === ADDRESS_ZERO ||
    nativeCosmWasmDenom.includes(tokenAddress)
  ) {
    return checksumAddress(ADDRESS_ZERO);
  }

  return checksumAddress(tokenAddress);
};

export const isAddressZero = (address: string) =>
  address === ADDRESS_ZERO || address === WRAPPER_SOL_ADDRESS;

export const waitTxnUntilDone = (
  fn: () => Promise<any>,
  time = 1000,
  limit = 60
) => {
  const now = Date.now() / 1000; // in seconds

  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const isExpired = Date.now() / 1000 - now >= limit;

        if (isExpired) {
          timer && clearInterval(timer);
          reject("Timeout");
        }
        const response = await fn();

        if (response) {
          clearInterval(timer);
          resolve(response);
        }
      } catch (error: any) {
        clearInterval(timer);
        reject(error.message);
      }
    }, time);
  });
};

export const compareAddresses = (
  chain: string,
  addressFrom: string,
  addressTo: string
): boolean => {
  try {
    switch (getChainKind(chain)) {
      case CHAIN_KIND.SOLANA:
      // return new PublicKey(addressFrom).equals(new PublicKey(address));
      case CHAIN_KIND.COSMWASM:
        return addressFrom === addressTo;
      case CHAIN_KIND.EVM:
        return checksumAddress(addressFrom) === checksumAddress(addressTo);
      default:
        return addressFrom === addressTo;
    }
  } catch (error) {
    return false;
  }
};

export function hexToDec(hex: string): number | string {
  if (!hex) {
    return hex;
  }

  const isNotHex = !hex.startsWith("0x");
  if (isNotHex) {
    return hex;
  }
  return parseInt(hex, 16);
}

export const decToHex = (num: number | string): string => {
  try {
    if (isNaN(Number(num))) return `${num}`;
    const hexStr = Number(num).toString(16);
    return `0x${hexStr}`;
  } catch (error) {
    return `${num}`;
  }
};

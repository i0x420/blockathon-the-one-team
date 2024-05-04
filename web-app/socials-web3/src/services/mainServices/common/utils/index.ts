import { ContractKey } from "../constant/type";
import { CONTRACT_ADDRESS } from "../constant";

export const getAddress = (address: ContractKey, chainId: string | number) => {
  return address[chainId] ? address[chainId] : address[56];
};

export const getAddressFeeManager = (chainId: number) => {
  return getAddress(CONTRACT_ADDRESS.FEE_MANAGER, chainId);
};

export const getAddressSocial = (chainId: number) => {
  return getAddress(CONTRACT_ADDRESS.SOCIAL, chainId);
};

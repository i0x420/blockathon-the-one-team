export type ContractType = "FEE_MANAGER" | "SOCIAL";

export type ContractKey = {
  [chainId: string | number]: string | string[];
};

export type ContractAddress = {
  [key in ContractType]: ContractKey;
};

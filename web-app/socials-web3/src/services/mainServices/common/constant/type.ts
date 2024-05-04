export type ContractType = "MAIN_TOKEN" | "SOCIAL";

export type ContractKey = {
  [chainId: string | number]: string | string[];
};

export type ContractAddress = {
  [key in ContractType]: ContractKey;
};

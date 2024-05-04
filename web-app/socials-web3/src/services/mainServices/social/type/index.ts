import { WalletContextState } from "@coin98-com/wallet-adapter-react";

export type CreateCommunityChanel = {
  name: string;
  symbol: string;
  owner: string;
  connector: WalletContextState;
};

export type RegisterCommunityChanel = {
  communityAddress: string;
  connector: WalletContextState;
};

export type BoostView = {
  communityAddress: string;
  community: string;
  postId: string;
  connector: WalletContextState;
};

export type ProtectPost = {
  communityAddress: string;
  community: string;
  postId: string;
  connector: WalletContextState;
};

export type JoinCommunityChanel = {
  communityAddress: string;
  connector: WalletContextState;
};

export type GetCommunityAddressBySalt = {
  salt: any
}

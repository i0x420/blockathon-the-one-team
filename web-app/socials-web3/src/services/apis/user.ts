import { ApiService } from "../apiService";

export const userAPI = {
  getUserInfo: async (address: string) => {
    const response = await ApiService.getData<any>({
      endpoint: "dagora/user/me",
      queryBody: { address },
    });
    return response;
  },
  getUserMetadata: async (address: string) => {
    const response = await ApiService.getData({
      endpoint: "dagora/user/meta",
      queryBody: { address },
    });
    return response;
  },

  getUserMetadataConfig: async (address: string) => {
    const response = await ApiService.getData({
      endpoint: "dagora/user/meta/config",
      queryBody: { address },
    });
    return response;
  },

  getUserMetadataStatical: async (address: string) => {
    const response = await ApiService.getData({
      endpoint: "dagora/user/meta/stats",
      queryBody: { address },
    });
    return response;
  },

  getUserAssets: async (params: {
    address: string;
    keyword?: string;
    chain: string;
    page: number;
    size: number;
  }) => {
    const { address, ...newParams } = params;

    const response = await ApiService.getData({
      endpoint: `dagora/user/balanceV3/${address}`,
      queryBody: { ...newParams },
    });
    return response;
  },
  getUserAssetsBySingleChain: async (params: {
    address: string;
    keyword?: string;
    chain: string;
    page: number;
    size: number;
    arrFilter: { address: string; chain: string; id: string }[];
  }) => {
    const response = await ApiService.postData({
      endpoint: `dagora/user/balance/single`,
      body: params,
    });
    return response.data;
  },
  updateProfile: async (profileData: {
    name?: string;
    quote?: string;
    social?: {
      website: string;
      facebook: string;
      twitter: string;
      telegram: string;
    };
    termAndConditions?: {
      date: number;
    };
  }) => {
    const response = await ApiService.putData({
      endpoint: "dagora/user",
      body: profileData,
    });

    return response;
  },
  getUserFavoriteList: async (address: string) => {
    const response = await ApiService.getData({
      endpoint: "dagora/favorite/user",
      queryBody: { address },
    });

    return response;
  },
  updateUserFavoriteList: async (params: {
    address: string;
    data: { address: string; chain: string; id: string };
    isActive: boolean;
    type: string;
  }) => {
    const response = await ApiService.putData({
      endpoint: "dagora/favorite",
      body: params,
    });

    return response;
  },
};

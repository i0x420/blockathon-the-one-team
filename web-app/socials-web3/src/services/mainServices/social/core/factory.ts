import { CHAIN_KIND, getChainKind } from "@/utils";
import { EvmSocialService } from "../evm";
import {
  CreateCommunityChanel,
  GetCommunityAddressBySalt,
  JoinCommunityChanel,
  RegisterCommunityChanel
} from "../type";

export class SocialService {
  private service;
  private chain;

  constructor(chain: string) {
    this.chain = chain;
    this.service = this.initService();
  }

  private initService() {
    const chain = this.chain;
    const chainKind = getChainKind(chain);

    switch (chainKind) {
      case CHAIN_KIND.EVM:
        return new EvmSocialService(chain);

      default:
        throw new Error(`${chain} is not supported`);
    }
  }

  async createCommunityChanel(params: CreateCommunityChanel) {
    try {
      const response = await this.service.createCommunityChanel(params);
      return response;
    } catch (error) {
      console.log("error ~ create community chanel: ", error);
      throw error;
    }
  }

  async joinCommunityChanel(params: JoinCommunityChanel) {
    try {
      const response = await this.service.joinCommunityChanel(params);
      return response;
    } catch (error) {
      console.log("error ~ join community chanel: ", error);
      throw error;
    }
  }

  async registerCommunityChanel(params: RegisterCommunityChanel) {
    try {
      const response = await this.service.registerCommunityChanel(params);
      return response;
    } catch (error) {
      console.log("error ~ register community chanel: ", error);
      throw error;
    }
  }

  async getCommunityAddressBySalt(params: GetCommunityAddressBySalt) {
    try {
      const response = await this.service.getCommunityAddressBySalt(params);
      return response;
    } catch (error) {
      console.log("error ~ get community chanel address: ", error);
      throw error;
    }
  }

  async getCommunities() {
    try {
      const response = await this.service.GetCommunities();
      return response;
    } catch (error) {
      console.log("error ~ get communities: ", error);
      throw error;
    }
  }
}

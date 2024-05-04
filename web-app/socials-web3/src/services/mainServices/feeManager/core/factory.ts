import { CHAIN_KIND, getChainKind } from "@/utils";
import { EvmFeeManagerService } from "../evm";

export class FeeManagerService {
  private service;
  private chain;

  constructor(chain: string) {
    this.chain = chain;
    this.service = this.initService();
  }

  initService() {
    const chain = this.chain;
    const chainKind = getChainKind(chain);

    switch (chainKind) {
      case CHAIN_KIND.EVM:
        return new EvmFeeManagerService(chain);

      default:
        throw new Error(`${chain} is not supported`);
    }
  }

  async createNFT(params: any) {
    try {
      const response = await this.service?.createNFT(params);
      return response;
    } catch (error) {
      console.log("error ~ create nft: ", error);
      throw error;
    }
  }
}

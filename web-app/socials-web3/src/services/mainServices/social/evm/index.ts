import {
  Web3Services,
  genErrorResponse,
  genSuccessResponse,
  getChainData,
} from "@/utils";
import { get } from "lodash";
import { socialABI } from "../../abi/socialABI";
import { getAddressFeeManager } from "../../common/utils";
import { CreateCommunityChanel, RegisterCommunityChanel } from "../type";

export class EvmSocialService {
  private client: Web3Services;
  private _chain: string;

  constructor(chain: string) {
    this._chain = chain;
    this.client = new Web3Services(chain as any);
  }

  private _genContract() {
    const client = this.client;
    const chainData = getChainData(this._chain);
    const numChainId = get(chainData, "numChainId");
    const contractAddress = getAddressFeeManager(numChainId) as string;
    const contract = client.getContract<typeof socialABI>(
      socialABI,
      contractAddress
    );
    return { contract, contractAddress };
  }

  async createCommunityChanel(params: CreateCommunityChanel) {
    const { name, symbol, owner, connector } = params;
    try {
      const { contract, contractAddress } = await this._genContract();
      const rawData = contract.methods
        .createCommunityChanel(name, symbol, owner)
        .encodeABI();
      const transaction = {
        to: contractAddress,
        data: rawData,
      };

      const hash = await connector.sendTransaction(transaction);

      if (!hash) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async registerCommunityChanel(params: RegisterCommunityChanel) {
    const { communityAddress, connector } = params;
    try {
      const { contract, contractAddress } = await this._genContract();
      const rawData = contract.methods
        .registerCommunityChanel(communityAddress)
        .encodeABI();
      const transaction = {
        to: contractAddress,
        data: rawData,
      };

      const hash = await connector.sendTransaction(transaction);

      if (!hash) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }
}

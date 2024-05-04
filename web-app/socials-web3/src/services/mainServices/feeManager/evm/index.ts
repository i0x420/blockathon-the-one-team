import {
  Web3Services,
  genErrorResponse,
  genSuccessResponse,
  getChainData,
} from "@/utils";
import { get } from "lodash";
import { feeManagerABI } from "../../abi/feeManagerABI";
import { getAddressFeeManager } from "../../common/utils";

export class EvmFeeManagerService {
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
    const contract = client.getContract<typeof feeManagerABI>(
      feeManagerABI,
      contractAddress
    );
    return { contract, contractAddress };
  }

  async createNFT(params: any) {
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
}

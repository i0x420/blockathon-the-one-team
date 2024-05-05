import {
  CHAIN_DATA,
  ERC721ABI,
  Web3Services,
  genErrorResponse,
  genSuccessResponse,
  generateId,
  getChainData,
  getChainIdFromChain
} from "@/utils";
import { get } from "lodash";
import { socialABI } from "../../abi/socialABI";
import { getAddressSocial } from "../../common/utils";
import {
  BoostView,
  CreateCommunityChanel,
  GetCommunityAddressBySalt,
  JoinCommunityChanel,
  RegisterCommunityChanel
} from "../type";

export class EvmSocialService {
  private client: Web3Services;
  private _chain: string;

  constructor(chain: string) {
    this._chain = chain;
    this.client = new Web3Services(chain as any);
  }

  private _genContract(type: string, contractAddress: string) {
    const client = this.client;
    let contract = null;

    switch (type) {
      case "SOCIAL":
        contract = client.getContract<typeof socialABI>(
          socialABI,
          contractAddress
        );
        break;

      // ERC721
      default:
        contract = client.getContract<typeof ERC721ABI>(
          ERC721ABI,
          contractAddress
        );
        break;
    }

    return { contract, contractAddress };
  }

  async createCommunityChanel(params: CreateCommunityChanel) {
    const { name, symbol, owner, connector } = params;
    try {
      const chainData = getChainData(this._chain);
      const numChainId = get(chainData, "numChainId");
      const contractAddress = getAddressSocial(numChainId) as string;
      console.log("contractAddress", contractAddress);

      const { contract } = this._genContract("SOCIAL", contractAddress);
      console.log("contract", contract);

      const web3Client = new Web3Services(this._chain as any);
      const web3 = web3Client.getClient();
      const randomId = generateId();
      const hexValue = web3.utils.toHex(randomId); // uniq generator id & post api
      const salt = web3.utils.padRight(hexValue, 64);
      const deploymentTypeHash = web3.eth.abi.encodeFunctionCall(
        {
          name: "__init_collection",
          type: "function",
          inputs: [
            {
              type: "string",
              name: "name"
            },
            {
              type: "string",
              name: "symbol"
            },
            {
              type: "address",
              name: "issuer"
            }
          ]
        },
        [name, symbol, owner]
      );
      console.log("name, symbol, owner", { name, symbol, owner });
      console.log("deploymentTypeHash", deploymentTypeHash);

      const rawData = contract.methods
        .createCommunityChanel(
          salt,
          deploymentTypeHash
          // "0x4fa01eda000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c50ceb622ce62d8568c0fb9ac5ca2c796968f5b9000000000000000000000000000000000000000000000000000000000000000747726f757020310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024731000000000000000000000000000000000000000000000000000000000000"
        )
        .encodeABI();
      console.log("rawData", rawData);
      const transaction = {
        from: connector.address,
        to: contractAddress,
        data: rawData,
        chainId: getChainIdFromChain(this._chain),
        gasLimit: 30_000_000
      };

      console.log("transaction: ", transaction);
      const hash = await connector.sendTransaction(transaction);
      console.log("hash: ", hash);
      console.log("salt: ", salt);

      if (hash.isError) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash: hash.data, salt });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async joinCommunityChanel(params: JoinCommunityChanel) {
    const { communityAddress, connector } = params;
    try {
      const { contract } = this._genContract("ERC721", communityAddress);
      const totalSupply = await contract.methods.totalSupply().call();
      const nextTokenId = Number(totalSupply) + 1;
      const rawData = contract.methods
        .mint(nextTokenId, connector.address)
        .encodeABI();

      const transaction: any = {
        from: connector.address,
        to: communityAddress,
        data: rawData,
        chainId: getChainIdFromChain(this._chain)
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
      const { contract, contractAddress } = this._genContract(
        "SOCIAL",
        communityAddress
      );
      const rawData = contract.methods
        .registerCommunityChanel(communityAddress)
        .encodeABI();
      const transaction = {
        from: connector.address,
        to: contractAddress,
        data: rawData,
        chainId: getChainIdFromChain(this._chain),
        gasLimit: 30_000_000
      };

      const hash = await connector.sendTransaction(transaction);

      if (!hash) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async boostView(params: BoostView) {
    const { community, postId, connector, communityAddress } = params;
    try {
      const { contract, contractAddress } = this._genContract(
        "SOCIAL",
        communityAddress
      );

      const rawData = contract.methods.boostView(this._stringToByte32(community), this._stringToByte32(postId)).encodeABI();
      const transaction = {
        from: connector.address,
        to: contractAddress,
        data: rawData,
        chainId: getChainIdFromChain(this._chain),
        gasLimit: 30_000_000
      };

      const hash = await connector.sendTransaction(transaction);

      if (!hash) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async protectPost(params: BoostView) {
    const { community, postId, connector, communityAddress } = params;
    try {
      const { contract, contractAddress } = this._genContract(
        "SOCIAL",
        communityAddress
      );
      const rawData = contract.methods.protectPost(this._stringToByte32(community), this._stringToByte32(postId)).encodeABI();

      const transaction = {
        from: connector.address,
        to: contractAddress,
        data: rawData,
        chainId: getChainIdFromChain(this._chain),
        gasLimit: 30_000_000
      };

      const hash = await connector.sendTransaction(transaction);

      if (!hash) return genErrorResponse("error_txsFail");

      return genSuccessResponse({ hash });
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async getCommunityAddressBySalt(params: GetCommunityAddressBySalt) {
    const { salt } = params;
    try {
      const chainData = getChainData(this._chain);
      const numChainId = get(chainData, "numChainId");
      const contractAddress = getAddressSocial(numChainId) as string;

      const { contract } = this._genContract("SOCIAL", contractAddress);
      const communityAddress = await contract.methods
        .getInstanceAddress(salt)
        .call();
      return genSuccessResponse(communityAddress);
    } catch (error) {
      throw genErrorResponse(error);
    }
  }

  async GetCommunities() {
    try {
      const chainData = getChainData(this._chain);
      const numChainId = get(chainData, "numChainId");
      const contractAddress = getAddressSocial(numChainId) as string;

      const { contract } = this._genContract("SOCIAL", contractAddress);
      const communityAddresses = await contract.methods.getCommunities().call();
      return genSuccessResponse(communityAddresses);
    } catch (error) {
      throw genErrorResponse(error);
    }
  }
  
  _stringToByte32(str: string) {
    const web3Client = new Web3Services(this._chain as any);
    const web3 = web3Client.getClient();
    const hexValue = web3.utils.toHex(str); // uniq generator id & post api
    const salt = web3.utils.padRight(hexValue, 64);
    return salt;
  }
}

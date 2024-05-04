// import { CONTRACT_ADDRESS } from '../../../../dagora-services/common/constant/address';
// import { ContractAbi, Web3, validator } from 'web3';

// import {
//   AbstractServices,
//   ApproveParams,
//   SigPermitErc20Params,
//   TokenAllowanceParams,
// } from '../abstract/abstractServices';
// import { ERC20ABI, VRC25ABI } from '../../abi';

// import { GetBalancesParams } from '../../../type';
// import {
//   ADDRESS_ZERO,
//   CHAIN_DATA,
//   CHAIN_TYPE,
//   LIST_CHAIN_SUPPORT,
//   genErrorResponse,
//   genSuccessResponse,
// } from '../../../common';
// import * as Web3Old from 'web3-old';
// import { permitHelperABI } from '../../../../dagora-services/services/abi';

// import { getAddress } from '../../../../dagora-services/common/utils';
// import { ERROR_APP } from '../../../../dagora-services/services/errors/type';

// export class TomoServices extends AbstractServices {
//   protected connection: Web3;
//   protected _rpc: string;
//   MAX_INT =
//     '115792089237316195423570985008687907853269984665640564039457584007913129639935';

//   constructor(chain: LIST_CHAIN_SUPPORT, rpc: string) {
//     super();
//     this._rpc = rpc;
//     this.connection = this.getClient(chain);
//   }

//   getClient = (chain: LIST_CHAIN_SUPPORT): Web3 => {
//     const chainData = CHAIN_DATA[chain];

//     if (!chainData) {
//       throw new Error(`${chain} is not ready!`);
//     }
//     const newWeb3: any = chain === CHAIN_TYPE.tomo ? Web3Old : Web3;

//     if (!this.connection) {
//       const rpcUrl = this._rpc || (chainData.rpcURL as string);
//       const client = new newWeb3(new newWeb3.providers.HttpProvider(rpcUrl));
//       this.connection = client;
//       return client;
//     }
//     return this.connection;
//   };

//   async getBalance({ ownerAddress, tokenAddress }: GetBalancesParams) {
//     try {
//       const client = this.connection;

//       // Include tokenAddress if want to get balance of ERC-20 token
//       if (tokenAddress && tokenAddress !== ADDRESS_ZERO) {
//         const contract = this.getContract(ERC20ABI, tokenAddress);
//         const balance = await contract.methods.balanceOf(ownerAddress).call();

//         return balance.toString();
//       }

//       // Main Balance
//       const latestBlock = 'latest';
//       const balance = await client.eth.getBalance(ownerAddress, latestBlock);

//       return balance.toString();
//     } catch (err) {
//       // throw err;
//       return '0';
//     }
//   }

//   getContract<TAbi extends ContractAbi>(abi: TAbi, contractAddress: string) {
//     const client = this.connection;
//     const contract = new client.eth.Contract(abi, contractAddress);

//     return contract;
//   }

//   // Token functions
//   async getTokenAllowance({
//     tokenAddress,
//     spenderAddress,
//     ownerAddress,
//   }: TokenAllowanceParams) {
//     try {
//       const contract = this.getContract(ERC20ABI, tokenAddress);
//       const allowance = (
//         await contract.methods.allowance(ownerAddress, spenderAddress).call()
//       ).toString();

//       return genSuccessResponse(allowance);
//     } catch (err) {
//       throw err;
//     }
//   }

//   async getSigPermitErc20({
//     ownerAddress,
//     tokenAddress,
//     spenderAddress,
//     amount,
//     connector,
//   }: SigPermitErc20Params) {
//     const contractToken = this.getContract(VRC25ABI, tokenAddress);
//     const nonce = await contractToken.methods.nonces(ownerAddress).call();
//     const latestBlock = await this.connection.eth.getBlock('latest');
//     const deadline = Number(latestBlock.timestamp) + Number(1200);

//     const msg = {
//       primaryType: 'Permit',
//       domain: {
//         name: 'Coin98VRC25',
//         version: '1',
//         chainId: 88,
//         verifyingContract: tokenAddress,
//       },
//       message: {
//         owner: ownerAddress,
//         spender: spenderAddress,
//         value: amount,
//         nonce,
//         deadline,
//       },

//       types: {
//         Permit: [
//           { name: 'owner', type: 'address' },
//           { name: 'spender', type: 'address' },
//           { name: 'value', type: 'uint256' },
//           { name: 'nonce', type: 'uint256' },
//           { name: 'deadline', type: 'uint256' },
//         ],
//         EIP712Domain: [
//           { name: 'name', type: 'string' },
//           { name: 'version', type: 'string' },
//           { name: 'chainId', type: 'uint256' },
//           { name: 'verifyingContract', type: 'address' },
//         ],
//       },
//     };

//     const resSignature = await connector.requestSignTypedData(msg);
//     const signature = resSignature?.data;

//     const ecdsaSignature = {
//       r: '0x' + signature.substring(2, 66),
//       s: '0x' + signature.substring(66, 130),
//       v: parseInt(signature.substring(130, 132), 16),
//       deadline,
//     };
//     return ecdsaSignature;
//   }

//   async approveTokenERC20({
//     ownerAddress,
//     tokenAddress,
//     spenderAddress,
//     connector,
//   }: ApproveParams) {
//     try {
//       const contract = this.getContract(ERC20ABI, tokenAddress);
//       const approveAbi = contract.methods
//         .approve(spenderAddress, this.MAX_INT)
//         .encodeABI();

//       const txn = {
//         from: ownerAddress,
//         to: tokenAddress,
//         data: approveAbi,
//         isWaitDone: true,
//       };

//       const txnHash = await connector.sendTransaction(txn);
//       return genSuccessResponse(txnHash);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async approveToken({
//     ownerAddress,
//     tokenAddress,
//     spenderAddress,
//     connector,
//   }: ApproveParams) {
//     try {
//       const addressPermitHelper = getAddress(
//         CONTRACT_ADDRESS.PERMIT_HELPER,
//         88,
//       ) as string;
//       const contract = this.getContract(permitHelperABI, addressPermitHelper);
//       const sign = await this.getSigPermitErc20({
//         ownerAddress,
//         tokenAddress,
//         spenderAddress,
//         connector,
//         amount: this.MAX_INT,
//       });

//       const dataTx = contract.methods
//         .permitERC20(
//           tokenAddress,
//           ownerAddress,
//           spenderAddress,
//           this.MAX_INT,
//           sign?.deadline,
//           sign?.v,
//           sign?.r,
//           sign?.s,
//         )
//         .encodeABI();
//       const txn = {
//         from: ownerAddress,
//         to: addressPermitHelper,
//         data: dataTx,
//         isWaitDone: true,
//       };

//       const txnHash = await connector.sendTransaction(txn);
//       return genSuccessResponse(txnHash);
//     } catch (error) {
//       const dataErr = genErrorResponse(error);
//       if (dataErr.message?.includes(ERROR_APP.CORRECT_ABI)) {
//         return await this.approveTokenERC20({
//           ownerAddress,
//           tokenAddress,
//           spenderAddress,
//           connector,
//         });
//       }
//       throw error;
//     }
//   }

//   async getNonce(address: string) {
//     return await this.connection.eth.getTransactionCount(address);
//   }

//   // Util functions
//   checksumAddress(address: string) {
//     return this.connection.utils.toChecksumAddress(address);
//   }

//   isValidAddress(address: string) {
//     if (!address) return false;

//     // Using validator provided by web3.js in new version
//     return validator.isAddress(address, true);
//   }

//   isNativeToken(address: string) {
//     return this.checksumAddress(address) === ADDRESS_ZERO;
//   }
// }

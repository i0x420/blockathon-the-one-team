import { FeeManager } from "./../typechain-types/FeeManager";
import { NESocial } from "./../typechain-types/NESocicial.sol/NESocial";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { Helper } from "./helper";
import {
  MainToken,
  MainToken__factory,
  SocialCollection,
  SocialCollection__factory,
} from "../typechain-types";
import config from "../deployment_config.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const GAS_LIMIT = 30_000_000;

const deployCollection = async (
  deployer: SignerWithAddress
): Promise<SocialCollection> => {
  const Factory: SocialCollection__factory = await ethers.getContractFactory(
    "SocialCollection"
  );
  const contract: SocialCollection = await Factory.connect(deployer).deploy({
    gasLimit: GAS_LIMIT,
  });
  await contract.deployed();

  return contract;
};

const deployToken = async (deployer: SignerWithAddress): Promise<MainToken> => {
  const Factory: MainToken__factory = await ethers.getContractFactory(
    "MainToken"
  );
  const contract: MainToken = await Factory.connect(deployer).deploy(
    ethers.utils.parseEther("10000000000"),
    {
      gasLimit: GAS_LIMIT,
    }
  );
  await contract.deployed();

  await contract
    .connect(deployer)
    .transfer(
      "0xc50ceb622ce62d8568c0fb9ac5ca2c796968f5b9",
      ethers.utils.parseEther("10000000000"),
      { gasLimit: GAS_LIMIT }
    );

  await contract
    .connect(deployer)
    .transferOwnership("0xc50ceb622ce62d8568c0fb9ac5ca2c796968f5b9", {
      gasLimit: GAS_LIMIT,
    });
  return contract;
};

async function deployFeeManager(
  deployer: SignerWithAddress,
  mainToken: MainToken
): Promise<FeeManager> {
  const feeManager__factory = await ethers.getContractFactory("FeeManager");
  const feeManager = await feeManager__factory
    .connect(deployer)
    .deploy(deployer.address, { gasLimit: GAS_LIMIT });

  await feeManager
    .connect(deployer)
    .configService(
      "0x1a1d401372523786d6ed01688ef1f846ad987c324bde9d24d9b5db12507739e0",
      mainToken.address,
      100,
      { gasLimit: GAS_LIMIT }
    );

  await feeManager
    .connect(deployer)
    .configService(
      "0xb5b9f805f09922b44e8119db91e3e5ab2c93dcca057017015e21543217ca7a4f",
      mainToken.address,
      100,
      { gasLimit: GAS_LIMIT }
    );

  await feeManager
    .connect(deployer)
    .configService(
      "0x696bb0aa6b0c3ada9425eca6b2b645a79ec143590c3fa4edfc352432d90e7a4e",
      mainToken.address,
      100,
      { gasLimit: GAS_LIMIT }
    );
  await feeManager
    .connect(deployer)
    .transferOwnership("0xc50ceb622ce62d8568c0fb9ac5ca2c796968f5b9", {
      gasLimit: GAS_LIMIT,
    });
  return feeManager;
}

const deployNESocial = async (
  deployer: SignerWithAddress,
  feeManager: FeeManager,
  collectionImpl: SocialCollection
): Promise<NESocial> => {
  const social__factory = await ethers.getContractFactory("NESocial");
  const NESocial = await social__factory.deploy(feeManager.address, {
    gasLimit: GAS_LIMIT,
  });

  await NESocial.connect(deployer).setImplement(collectionImpl.address);
  await NESocial.connect(deployer).transferOwnership(
    "0xc50ceb622ce62d8568c0fb9ac5ca2c796968f5b9",
    { gasLimit: GAS_LIMIT }
  );
  return NESocial;
};

async function createCommunityChanel(
  salt: string,
  name: string,
  symbol: string,
  owner: string
): Promise<[string, string]> {
  const collection = await ethers.getContractFactory("SocialCollection");
  const initializeFunc = "__init_collection";
  const saltCommunity = convertStringToBytes32(salt);
  const deploymentTypeHash = collection.interface.encodeFunctionData(
    initializeFunc,
    [name, symbol, owner]
  );

  return [saltCommunity, deploymentTypeHash];
}

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.info("Deployer address", deployer.address);

  const collection: SocialCollection = await deployCollection(deployer);
  console.log("Collection", collection.address);

  const mainToken: MainToken = await deployToken(deployer);
  console.log("mainToken", mainToken.address);

  const feeManager: FeeManager = await deployFeeManager(deployer, mainToken);
  console.log("feeManager", feeManager.address);

  const NESocial: NESocial = await deployNESocial(
    deployer,
    feeManager,
    collection
  );

  //   await NESocial.getAll();
  console.log("NESocial", NESocial.address);

  //   await Helper.syncWriteFile(
  //     "./constants.ts",
  //     `export default [\n     "${collection.address}" // SocialCollection\n]`
  //   );
};

const convertStringToBytes32 = (str: string) => {
  return ethers.utils.formatBytes32String(str);
};

main();

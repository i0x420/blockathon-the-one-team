import { FeeManager } from "./../typechain-types/FeeManager";
import { NESocial } from "./../typechain-types/NESocicial.sol/NESocial";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { Helper } from "./helper";
import {
  SocialCollection,
  SocialCollection__factory,
} from "../typechain-types";
import config from "../deployment_config.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const deployCollection = async (
  deployer: SignerWithAddress
): Promise<SocialCollection> => {
  const Factory: SocialCollection__factory = await ethers.getContractFactory(
    "SocialCollection"
  );
  const contract: SocialCollection = await Factory.connect(deployer).deploy();
  await contract.deployed();

  console.info("Eternal Collection", contract.address);
  return contract;
};

async function deployFeeManager(
  deployer: SignerWithAddress
): Promise<FeeManager> {
  const feeManager__factory = await ethers.getContractFactory("FeeManager");
  const feeManager = await feeManager__factory
    .connect(deployer)
    .deploy(deployer.address);

  return feeManager;
}

const deployNESocial = async (
  deployer: SignerWithAddress,
  feeManager: FeeManager,
  collectionImpl: SocialCollection
): Promise<NESocial> => {
  const social__factory = await ethers.getContractFactory("NESocial");
  const NESocial = await social__factory.deploy(feeManager.address);
  console.log("NESocial", NESocial.address);

  await NESocial.connect(deployer).setImplement(collectionImpl.address);
  return NESocial;
};

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.info("Deployer address", deployer.address);

  const collection: SocialCollection = await deployCollection(deployer);
  console.log("Collection", collection.address);

  const feeManager: FeeManager = await deployFeeManager(deployer);
  console.log("feeManager", feeManager.address);

  const NESocial: NESocial = await deployNESocial(
    deployer,
    feeManager,
    collection
  );
  console.log("feeManager", feeManager.address);

  await Helper.syncWriteFile(
    "./constants.ts",
    `export default [\n     "${collection.address}" // SocialCollection\n]`
  );
};

main();

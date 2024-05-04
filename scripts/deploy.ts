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

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.info("Deployer address", deployer.address);

  const collection: SocialCollection = await deployCollection(deployer);

  await Helper.syncWriteFile(
    "./constants.ts",
    `export default [\n     "${collection.address}" // SocialCollection\n]`
  );
};

main();

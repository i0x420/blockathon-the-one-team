import { NESocial } from "./../typechain-types/NESocicial.sol/NESocial";
import { FeeManager } from "./../typechain-types/FeeManager";
import { MainToken } from "../typechain-types/MainToken";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

import { SocialCollection } from "../typechain-types";

describe("Social Collection", () => {
  const baseURI = "https://api.example.com/v1/";
  const name = "Test Social Collection";
  const symbol = "TEC";
  const balanceToken = 5;
  const nonExistentTokenId = balanceToken + 1;

  let owner: SignerWithAddress;
  let feeManager: FeeManager;
  let NESocial: NESocial;

  let token: SocialCollection;

  async function initSocialPlatform(feeManager: FeeManager): Promise<NESocial> {
    const social__factory = await ethers.getContractFactory("NESocial");
    const NESocial = await social__factory.deploy(feeManager.address);
    return NESocial;
  }

  async function deployFeeManager(): Promise<FeeManager> {
    const feeManager__factory = await ethers.getContractFactory("FeeManager");
    const feeManager = await feeManager__factory.deploy();

    return feeManager;
  }

  async function createCommunityChanel(): Promise<SocialCollection> {
    const collection = await ethers.getContractFactory("SocialCollection");
    const initializeFunc = "__init_collection";
    const salt = ethers.utils.formatBytes32String("salt");
    const deploymentTypeHash = collection.interface.encodeFunctionData(
      initializeFunc,
      [name, symbol, owner.address]
    );

    console.log("deploy", deploymentTypeHash);

    await NESocial.connect(owner).createCommunityChanel(
      salt,
      deploymentTypeHash
    );
    const deployedAddr = await NESocial.getInstanceAddress(salt);

    return await collection.attach(deployedAddr);
  }

  // async function 

  // async function deployCollection(): Promise<SocialCollection> {
  //   const token__factory = await ethers.getContractFactory("SocialCollection");
  //   const token: SocialCollection = await token__factory.deploy();

  //   await token.__init_collection(name, symbol, owner.address);
  //   return token;
  // }

  // async function create
  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    const collectionFactory = await ethers.getContractFactory(
      "SocialCollection"
    );
    const impl = await collectionFactory.deploy();
    feeManager = await deployFeeManager();
    NESocial = await initSocialPlatform(feeManager);
    await NESocial.connect(owner).setImplement(impl.address);
  });

  it("Checking", async () => {
    // console.info("SocialCollection", token.address);

    console.info("Fee Manager", feeManager.address);

    console.info("Main platform", NESocial.address);

    // await NESocial.connect(owner).createCommunityChanel(
    //   name,
    //   symbol,
    //   owner.address
    // );

    // let value = await NESocial._communities(0);
    const value = await createCommunityChanel();
    console.log("value", value.address);

    const x = await ethers.getContractAt("SocialCollection", value.address);

    await x.mint(100, owner.address);

    // const value2 = await

    console.log("owner", await x.ownerOf(100));

    expect(1).to.eq(0);
  });
});

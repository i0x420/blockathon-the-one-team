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

  const createCommunityChanelService =
    "0x1a1d401372523786d6ed01688ef1f846ad987c324bde9d24d9b5db12507739e0";
  const registerCommunityChanelService =
    "0xb5b9f805f09922b44e8119db91e3e5ab2c93dcca057017015e21543217ca7a4f";
  const boostViewCommunityChanelService =
    "0x97990b57f9b088fc1389ec122e46242c00dc88ed9d81e3af2167746e73889683";
  const protectPostCommunityChanelService =
    "0xb2126fe422be7324c62be96d430fec5494582b8a650a78773ee21e9df48bf4f1";
  let owner: SignerWithAddress;
  let feeManager: FeeManager;
  let NESocial: NESocial;

  let communityCollection: SocialCollection;

  let serviceToken: MainToken;

  async function initSocialPlatform(feeManager: FeeManager): Promise<NESocial> {
    const social__factory = await ethers.getContractFactory("NESocial");
    const NESocial = await social__factory.deploy(feeManager.address);
    return NESocial;
  }

  async function deployFeeManager(): Promise<FeeManager> {
    const feeManager__factory = await ethers.getContractFactory("FeeManager");
    const feeManager = await feeManager__factory.deploy(owner.address);

    return feeManager;
  }

  async function deployMainToken(): Promise<MainToken> {
    const mainToken__factory = await ethers.getContractFactory("MainToken");
    const mainToken = await mainToken__factory.deploy(
      ethers.utils.parseEther("1000000000")
    );

    return mainToken;
  }

  async function createCommunityChanel(): Promise<SocialCollection> {
    const collection = await ethers.getContractFactory("SocialCollection");
    const initializeFunc = "__init_collection";
    const salt = ethers.utils.formatBytes32String("salt");
    console.log("salt", salt.length);
    const deploymentTypeHash = collection.interface.encodeFunctionData(
      initializeFunc,
      [name, symbol, owner.address]
    );

    // const deploymentTypeHash = `0x4fa01eda000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c50ceb622ce62d8568c0fb9ac5ca2c796968f5b9000000000000000000000000000000000000000000000000000000000000000747726f757020310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024731000000000000000000000000000000000000000000000000000000000000`;
    console.info("deploymentTypeHash", deploymentTypeHash);

    const tx = await NESocial.connect(owner).createCommunityChanel(
      salt,
      deploymentTypeHash
    );
    console.log("tx", tx);

    await tx;
    const deployedAddr = await NESocial.getInstanceAddress(salt);

    return await collection.attach(deployedAddr);
  }

  async function configFeeManager(
    paymentToken: string,
    fee: number[]
  ): Promise<any> {
    const configCreateChanel = feeManager
      .connect(owner)
      .configService(createCommunityChanelService, paymentToken, fee[0]);

    const configRegisterChanel = feeManager
      .connect(owner)
      .configService(registerCommunityChanelService, paymentToken, fee[1]);

    const configBoostView = feeManager
      .connect(owner)
      .configService(boostViewCommunityChanelService, paymentToken, fee[2]);

    const configProtectPost = feeManager
      .connect(owner)
      .configService(protectPostCommunityChanelService, paymentToken, fee[3]);

    await Promise.all([
      configCreateChanel,
      configRegisterChanel,
      configBoostView,
      configProtectPost,
    ]);
  }

  async function startListeningService() {
    // const contract = new ethers.Contract(NESocial.address, ABI.abi, provider);

    NESocial.on("PostProtected", async (data) => {
      // console.log(data);
      // let eventLog = await checkEventLog(action?.hash);
      // let info = {
      //   projectKey: projectKey,
      //   action: eventLog.action,
      //   from: from,
      //   to: to,
      //   data: ethers.utils.defaultAbiCoder.encode([""])
      // };

      console.info("Event Triggered:", data);

      // console.info(
      //   "Event detected",
      //   action.hash,
      //   await checkEventLog(action?.hash)
      // );
    });

    console.info("Listening for events...");
  }

  const convertStringToBytes32 = (str: string) => {
    return ethers.utils.formatBytes32String(str);
  };

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

    await startListeningService();

    serviceToken = await deployMainToken();

    await serviceToken
      .connect(owner)
      .approve(NESocial.address, await serviceToken.balanceOf(owner.address));

    const config = await configFeeManager(
      serviceToken.address,
      [100, 100, 100, 100]
    );
    console.info("config", config);

    const value = await NESocial.getData();
    console.info("valiue", value);
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
    const communityPFP = await createCommunityChanel();
    console.info("value", communityPFP.address);

    const x = await ethers.getContractAt(
      "SocialCollection",
      communityPFP.address
    );

    await NESocial.boostView(
      communityPFP.address,
      ethers.utils.formatBytes32String("post1")
    );

    await NESocial.protectPost(
      communityPFP.address,
      ethers.utils.formatBytes32String("post1")
    );

    await x.connect(owner).mint(100, owner.address);

    // const communityPFP2 = await

    console.info("owner", await x.ownerOf(100));

    const isCommunity = await NESocial.isActiveCommunity(communityPFP.address);

    console.info("check Community of new created cm", isCommunity);

    const fee = await feeManager.getServiceFee(createCommunityChanelService);

    console.log("fee", fee);

    const communities = await NESocial.getCommunities();
    console.log("communities", communities);

    // expect(1).to.eq(0);
  });
});

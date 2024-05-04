"use client";

import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toaster/useToast";
import { SocialService } from "@/services/mainServices";
import {
  getAddressMainToken,
  getAddressSocial
} from "@/services/mainServices/common/utils";
import { Web3Services, getNumChainId } from "@/utils";
import { useWallet } from "@coin98-com/wallet-adapter-react";

const TestPage = () => {
  const walletConnector = useWallet();
  const { toastNe } = useToast();

  const handleCreateCommunityChannel = async () => {
    if (!walletConnector.connected) return "Please connect wallet";

    // appove main token
    const web3Client = new Web3Services("tomo" as any);
    const approveToken = await web3Client.approveToken({
      ownerAddress: walletConnector.address,
      spenderAddress: getAddressSocial(getNumChainId("tomo")) as string,
      tokenAddress: getAddressMainToken(getNumChainId("tomo")) as string,
      connector: walletConnector
    });
    console.log("approveToken: ", approveToken);

    // create community channel
    const mainServices = new SocialService("tomo");
    const createCommunity = await mainServices.createCommunityChanel({
      name: "Group 1",
      symbol: "G1",
      owner: walletConnector.address,
      connector: walletConnector
    });

    console.log("createCommunity: ", createCommunity);
  };

  const handleJoinChannel = async () => {
    if (!walletConnector.connected) return "Please connect wallet";

    const mainServices = new SocialService("tomo");
    const joimCommunity = await mainServices.joinCommunityChanel({
      communityAddress: "0xFD284dC3a5243Dd7f66D319FbE593275EA0c96C9",
      connector: walletConnector
    });

    console.log("joimCommunity: ", joimCommunity);
  };

  const handleGetCommunityAddress = async () => {
    const mainServices = new SocialService("tomo");
    const addressCommunity = await mainServices.getCommunityAddressBySalt({
      salt: "0x5359374e723879434b455444456e773900000000000000000000000000000000" // fetch api BE
    });

    console.log("addressCommunity: ", addressCommunity.data);
  };

  const handleGetCommunities = async () => {
    toastNe({ type: "success", description: "HIHIHIHI" });
    const mainServices = new SocialService("tomo");
    const communities = await mainServices.getCommunities();
    console.log("communities: ", communities);
  };

  return (
    <div className="flex items-center gap-4">
      <Tabs
        variant="background"
        items={[
          { title: "AAA", content: "A ne" },
          { title: "BBB", content: "B ne" }
        ]}
      />
      <Button onClick={handleCreateCommunityChannel}>
        Create Community Channel
      </Button>
      <Button onClick={handleJoinChannel}>Join Channel</Button>
      <Button onClick={handleGetCommunityAddress}>Get Community Address</Button>
      <Button onClick={handleGetCommunities}>Get Communities</Button>
    </div>
  );
};

export default TestPage;

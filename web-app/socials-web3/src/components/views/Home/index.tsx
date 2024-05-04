"use client";

import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import { Feed } from "./components/Feed";
import { Community } from "./components/Community";
import { Button } from "@/components/ui/Button";
import { SendVibeButton } from "./components/CreatePostModal";
import { useUserStore } from "@/stores/useUserStore";

export default function Home() {
  const { userInfo } = useUserStore();

  const {
    address,
    selectedChainId,
    disconnect,
    selectedBlockChain,
    connected,
  } = useWallet();
  const { openWalletModal } = useWalletModal();

  return (
    <>
      <div className="flex gap-6">
        <div className="w-[20%]">
          <div className="text-text-secondary px-4 py-4">
            Recommended Community
          </div>
          <Community />
        </div>
        <div className="w-[60%] border-l pl-6">
          <div className="flex justify-between items-center  ">
            <div className="text-text-secondary px-4 py-4">Feed</div>
            <div>{userInfo?.username && <SendVibeButton />}</div>
          </div>
          <Feed />
        </div>
        <div className="w-[20%]">
          <div className="text-text-secondary px-4 py-4"> Suggest & Events</div>
        </div>
      </div>
    </>
  );
}

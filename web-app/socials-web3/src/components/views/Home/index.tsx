"use client";

import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";

export default function Home() {
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
      <div>
        {!connected && <button onClick={openWalletModal}>Connect</button>}
        {connected && <button onClick={disconnect}>Disconnect</button>}
      </div>

      <div>
        {connected && (
          <div>
            <div>
              Address: <span>{address}</span>
            </div>

            <div>
              Network: <span>{selectedChainId}</span>
            </div>

            <div>
              Blockchain: <span>{selectedBlockChain}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { ChainInfo, evmChains } from "@coin98-com/wallet-adapter-react-ui";

const WalletModalC98 = dynamic(
  async () =>
    (await import("@coin98-com/wallet-adapter-react-ui")).WalletModalC98,
  {
    ssr: false,
  }
);

const Coin98AdapterModal = () => {
  const defaultChains = [...evmChains]; // multi-chain
  // const defaultChains = [tomo,ether]; // single-chainds
  return <WalletModalC98 isC98Theme enableChains={defaultChains} />;
};

export default Coin98AdapterModal;

import React from "react";

// wallets
import Coin98AdapterProvider from "../wallet-adapter/WalletProvider";
import Coin98AdapterModal from "../wallet-adapter/WalletModal";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Coin98AdapterProvider>
      {children}
      <Coin98AdapterModal />
    </Coin98AdapterProvider>
  );
};

export default Providers;

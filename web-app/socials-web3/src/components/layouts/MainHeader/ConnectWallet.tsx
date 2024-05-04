import { formatAddress } from "@/common/functions";
import { Button } from "@/components/ui/Button";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";

interface ConnectWalletProps {
  className: string;
  title: string;
}

const ConnectWallet = ({ className, title }: ConnectWalletProps) => {
  const {
    address,
    selectedChainId,
    selectedBlockChain,
    connected,
    disconnect,
  } = useWallet();
  const { openWalletModal } = useWalletModal();

  if (connected) {
    return (
      <div>
        <p>{formatAddress(address)}</p>
        <Button onClick={disconnect}>Disconnect</Button>
      </div>
    );
  }

  return <Button onClick={openWalletModal}>Connect Wallet</Button>;
};

export default ConnectWallet;

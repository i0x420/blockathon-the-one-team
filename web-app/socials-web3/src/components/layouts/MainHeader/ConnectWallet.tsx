import { formatAddress } from "@/common/functions";
import { Button } from "@/components/ui/Button";
import CopyIcon from "@/components/ui/CopyIcon";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { useProfileBalance } from "@/hooks/useProfileBalance";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";

interface ConnectWalletProps {
  className: string;
  title: string;
}

const ConnectWallet = ({ className, title }: ConnectWalletProps) => {
  const { address, connected, disconnect } = useWallet();
  const { openWalletModal } = useWalletModal();
  const {
    balanceConverted,
    activeSymbol,
    isLoadingBalance
  } = useProfileBalance();

  if (connected) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <CopyIcon text={address} iconSize="sm" isNoTextCopied />
            <p>{formatAddress(address)}</p>
          </div>
          {isLoadingBalance ? (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
            </span>
          ) : (
            <p className="text-xs text-text-placeholder">
              {balanceConverted}
              <span className="uppercase ml-1">{activeSymbol}</span>
            </p>
          )}
        </div>

        <div>
          <img
            className="rounded w-8 h-8"
            alt="avatar"
            srcSet={`https://picsum.photos/80/80?random=${1}`}
          />
        </div>
        <IconButton
          iconClassName="font-bold"
          className="bg-brand-primary text-reverse-text-primary"
          iconName="logout"
          onClick={disconnect}
        />
      </div>
    );
  }

  return <Button onClick={openWalletModal}>Connect Wallet</Button>;
};

export default ConnectWallet;

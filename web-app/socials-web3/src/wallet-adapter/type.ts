import { ChainInfo } from "@coin98-com/wallet-adapter-react-ui";
import { CSSProperties, ReactNode } from "react";

export interface WalletType {
  className?: string;
  container?: string;
  enableChains?: ChainInfo[];
  activeChainId?: string;
  titleModal?: string | ReactNode;
  titleWallets?: string | ReactNode;
  titleNetworks?: string | ReactNode;
  layoutClass?: string;
  layoutStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  overlayClass?: string;
  isC98Theme?: boolean;
  renderListChains?: (chainData: ChainInfo, isActive: boolean) => ReactNode;
  renderListWallets?: (walletIcon: string, walletName: string) => ReactNode;
}

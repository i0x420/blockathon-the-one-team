import {
  CHAIN_DATA,
  Web3Services,
  convertWeiToBalance,
  formatReadableNumber,
  getChainFromChainId,
  getChainSymbol
} from "@/utils";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { get } from "lodash";
import { useEffect, useMemo, useState } from "react";

export const useProfileBalance = () => {
  const walletConnector = useWallet();
  const activeAddress = walletConnector?.address;
  const activeChain = getChainFromChainId(
    walletConnector?.selectedChainId as string
  );

  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [mainBalance, setMainBalance] = useState("0");

  const decimal = useMemo(() => {
    if (!activeChain) return 18;
    return (
      get(CHAIN_DATA, `${activeChain}.decimals`) ||
      get(CHAIN_DATA, `${activeChain}.decimal`)
    );
  }, [activeChain]);

  const balanceConverted = useMemo(() => {
    if (mainBalance === "0") return "0";
    return formatReadableNumber(
      convertWeiToBalance(mainBalance, decimal).toString(),
      {
        isTokenAmount: true
      }
    );
  }, [mainBalance, decimal]);

  const activeSymbol = useMemo(() => {
    return getChainSymbol(activeChain);
  }, [activeChain]);

  useEffect(() => {
    if (activeAddress) {
      initGetBalance();
    }
  }, [activeAddress]);

  const initGetBalance = async () => {
    setIsLoadingBalance(true);
    try {
      const web3Client = new Web3Services(activeChain as any);
      const balance = await web3Client.getBalance({
        ownerAddress: activeAddress
      });

      setMainBalance(balance);
      return balance;
    } catch (error) {
      console.log("error get balance :", error);
      setMainBalance(mainBalance);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const refetchBalance = () => {
    if (activeAddress) {
      initGetBalance();
    }
  };

  return {
    mainBalance,
    isLoadingBalance,
    balanceConverted,
    activeSymbol,
    refetchBalance
  };
};

"use client";

import { formatAddress } from "@/common/functions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputArea } from "@/components/ui/InputArea";
import { InputGroup } from "@/components/ui/InputGroup";
import { useToast } from "@/components/ui/Toaster/useToast";
import { useProfileBalance } from "@/hooks/useProfileBalance";
import { CommunityAPI } from "@/services/apis";
import { SocialService } from "@/services/mainServices";
import {
  getAddressMainToken,
  getAddressSocial
} from "@/services/mainServices/common/utils";
import { Web3Services, getChainFromChainId, getNumChainId } from "@/utils";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
};

export default function CreateCommunityScreen() {
  const walletConnector = useWallet();
  const { refetchBalance } = useProfileBalance();
  const { toastNe } = useToast();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isValid, isDirty }
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    console.log({ data });

    if (!walletConnector.connected) {
      setLoading(false);
      return toastNe({
        type: "error",
        description: "Please connect wallet"
      });
    }

    const matches = data.name.match(/\b(\w)/g);
    const symbol = matches.join("").toUpperCase();
    console.log("symbol", symbol);

    const activeChain = getChainFromChainId(
      walletConnector.selectedChainId as string
    ) as any;

    const ownerAddress = walletConnector.address;
    const spenderAddress = getAddressSocial(
      getNumChainId(activeChain)
    ) as string;
    const tokenAddress = getAddressMainToken(
      getNumChainId(activeChain)
    ) as string;

    try {
      // appove main token
      const web3Client = new Web3Services(activeChain);
      const tokenAllowance = await web3Client.getTokenAllowance({
        ownerAddress,
        spenderAddress,
        tokenAddress
      });
      const checkApproved = Number(tokenAllowance.data) > 0;

      // check allowance
      if (!checkApproved) {
        const approveToken = await web3Client.approveToken({
          ownerAddress,
          spenderAddress,
          tokenAddress,
          connector: walletConnector
        });
        const hashApprove = approveToken.data;
        console.log("approveToken: ", { approveToken, hashApprove });
      }

      // create onchain
      const mainServices = new SocialService(activeChain);
      const createCommunity = await mainServices.createCommunityChanel({
        name: data.name,
        symbol: symbol,
        owner: walletConnector.address,
        connector: walletConnector
      });
      console.log("createCommunity: ", createCommunity);

      if (createCommunity.isErr) {
        return toastNe({
          type: "error",
          description: createCommunity?.message || "Internal error"
        });
      }

      const hash = createCommunity?.data?.hash;
      const salt = createCommunity?.data?.salt;

      // create offchain
      const { error, community } = await CommunityAPI.createCommunity(
        data.name,
        data.description,
        hash,
        salt
      );
      // const { error, post } = await PostsAPI.createPost(
      //   data.author,
      //   data.content
      // );

      toastNe({
        type: "success",
        description: "Create group successfully"
      });
    } catch (error) {
      console.log("error: ", error);
      toastNe({
        type: "error",
        description: error || "Internal error"
      });
    } finally {
      refetchBalance();
      setLoading(false);
    }
  };

  if (!walletConnector.connected) return null;

  return (
    <div className="flex items-center justify-center h-[80vh] w-full">
      <div className="w-fit h-fit min-w-[40vw] bg-background-primary rounded-lg p-4">
        <h1 className="pb-4 border-b text-xl">Create Channel</h1>
        <div className="flex items-center gap-2 my-4">
          <img
            className="rounded w-8 h-8"
            alt="avatar"
            srcSet={`https://picsum.photos/80/80?random=${1}`}
          />
          <p>{formatAddress(walletConnector.address)}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col">
          <Controller
            render={({ field }) => (
              <InputGroup
                labelClassName="text-text-secondary"
                errorMessage={get(errors, "name")?.message}
              >
                <Input
                  placeholder="Channel name"
                  isBlock
                  {...field}
                  className=""
                />
              </InputGroup>
            )}
            control={control}
            name="name"
          />
          <Controller
            render={({ field }) => (
              <InputGroup
                labelClassName="text-text-secondary"
                errorMessage={get(errors, "description")?.message}
              >
                <InputArea
                  placeholder="Description"
                  rowsInput={6}
                  isBlock
                  {...field}
                  className=""
                />
              </InputGroup>
            )}
            control={control}
            name="description"
          />
          <div className="flex items-center gap-4">
            <Button isBlock color="secondary" onClick={() => router.back()}>
              Next time
            </Button>
            <Button
              type="submit"
              isBlock
              isLoading={loading}
              disabled={!isValid || !isDirty}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

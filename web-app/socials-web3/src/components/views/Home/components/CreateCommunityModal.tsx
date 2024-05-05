import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { InputArea } from "@/components/ui/InputArea";
import { InputGroup } from "@/components/ui/InputGroup";
import { useToast } from "@/components/ui/Toaster/useToast";
import { useProfileBalance } from "@/hooks/useProfileBalance";
import { CommunityAPI, PostsAPI } from "@/services/apis";
import { SocialService } from "@/services/mainServices";
import {
  getAddressMainToken,
  getAddressSocial
} from "@/services/mainServices/common/utils";
import { useUserStore } from "@/stores/useUserStore";
import { Web3Services, getChainFromChainId, getNumChainId } from "@/utils";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { Dialog, Transition } from "@headlessui/react";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  description: string;
};

export function CreateCommunityButton({ refresh }: { refresh?: () => void }) {
  const walletConnector = useWallet();
  const { refetchBalance } = useProfileBalance();
  const { toastNe } = useToast();

  let [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      description:
        "Proudly presenting 𝐕𝐢𝐜𝐭𝐢𝐨𝐧 𝐖𝐨𝐫𝐥𝐝 𝐖𝐢𝐝𝐞 𝐂𝐡𝐚𝐢𝐧 🌐 - reimagining everything you thought you knew. Scale beyond limits, enhance security, embrace liberty, foster win-win for all, and unlock collective value creation.",
      name: "Vibe Fan 1"
    }
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
      closeModal();
      refresh();
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

  return (
    <>
      <IconButton
        className="bg-brand-primary text-reverse-text-primary hover:bg-brand-primary"
        iconName="add"
        onClick={openModal}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-background-primary p-6 text-left align-middle shadow-xl transition-all gap-6 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-bold text-md">Create Community</div>
                    <Icon
                      className="cursor-pointer"
                      iconName="close"
                      onClick={closeModal}
                    />
                  </div>
                  <div className="flex justify-start items-center">
                    <img
                      className="rounded-full w-12 h-12 mr-2"
                      alt={userInfo?.fullname}
                      srcSet={`https://picsum.photos/80/80?random=123`}
                    />
                    <div>
                      <span className="cursor-pointer text-bold">
                        {userInfo?.fullname}
                      </span>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-6 flex-col"
                  >
                    <Controller
                      render={({ field }) => (
                        <InputGroup
                          label="Community name"
                          labelClassName="text-text-secondary"
                          isRequired
                          errorMessage={get(errors, "name")?.message}
                        >
                          <Input isBlock {...field} className="" />
                        </InputGroup>
                      )}
                      control={control}
                      name="name"
                    />
                    <Controller
                      render={({ field }) => (
                        <InputGroup
                          label="Description"
                          labelClassName="text-text-secondary"
                          isRequired
                          errorMessage={get(errors, "description")?.message}
                        >
                          <InputArea
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
                    <Button type="submit" isLoading={loading} className="mt-6">
                      Create Community
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

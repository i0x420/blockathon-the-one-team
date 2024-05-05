import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { InputArea } from "@/components/ui/InputArea";
import { PostsAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  content: string;
  author: string;
};

export function SendVibeButton({ communitySlug }: { communitySlug?: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { signMessage } = useWallet();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      content:
        "Proudly presenting 𝐕𝐢𝐜𝐭𝐢𝐨𝐧 𝐖𝐨𝐫𝐥𝐝 𝐖𝐢𝐝𝐞 𝐂𝐡𝐚𝐢𝐧 🌐 - reimagining everything you thought you knew. Scale beyond limits, enhance security, embrace liberty, foster win-win for all, and unlock collective value creation.",
      author: "dungnguyen"
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
    const sign = await signMessage("Confirm post your status!");

    if (!sign) return setLoading(false);
    const { error, post } = await PostsAPI.createPost(
      data.author,
      data.content,
      communitySlug || ""
    );
    console.log(" Create post ok ");

    closeModal();
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <div onClick={openModal} className="py-6 w-full">
        <div className="flex justify-start items-center cursor-pointer">
          <img
            className="rounded w-12 h-12 mr-4"
            alt={"avatar"}
            srcSet={`https://picsum.photos/80/80?random=123`}
          />
          <div>
            <span className="text-text-secondary text-md">
              What on your mind?
            </span>
          </div>
        </div>
      </div>
      {/* <Button onClick={openModal}>Send Vibe</Button> */}

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
                    <div className="text-bold text-md">Create Post</div>
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

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      render={({ field }) => (
                        <InputArea
                          rowsInput={6}
                          isBlock
                          {...field}
                          className=""
                        />
                      )}
                      control={control}
                      name="content"
                    />
                    {communitySlug && (
                      <div>
                        Post to{" "}
                        <span className="text-emerald-700 text-bold">
                          {communitySlug}
                        </span>
                      </div>
                    )}
                    <Button
                      type="submit"
                      isBlock
                      isLoading={loading}
                      className="mt-6"
                    >
                      Post
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

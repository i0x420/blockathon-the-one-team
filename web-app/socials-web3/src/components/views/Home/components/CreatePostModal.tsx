import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputArea } from "@/components/ui/InputArea";
import { PostsAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  content: string;
  author: string;
};

export function SendVibeButton() {
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
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      content:
        "Proudly presenting 𝐕𝐢𝐜𝐭𝐢𝐨𝐧 𝐖𝐨𝐫𝐥𝐝 𝐖𝐢𝐝𝐞 𝐂𝐡𝐚𝐢𝐧 🌐 - reimagining everything you thought you knew. Scale beyond limits, enhance security, embrace liberty, foster win-win for all, and unlock collective value creation.",
      author: "dungnguyen",
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log({ data });
    const { error, post } = await PostsAPI.createPost(
      data.author,
      data.content
    );
    console.log(" Create post ok ");
    
    closeModal()
    setLoading(false);
  };

  return (
    <>
      <Button onClick={openModal}>Send Vibe</Button>

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
                    <div onClick={closeModal}>X</div>
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
                      render={({ field }) => <InputArea rowsInput={6} isBlock {...field} className="" />}
                      control={control}
                      name="content"
                    />
                    <Button type="submit" isLoading={loading} className="mt-6">
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
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { InputArea } from "@/components/ui/InputArea";
import { PostsAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  content: string;
  author: string;
};

type Props = {};

const UploadPost = (props: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors, isDirty, isValid }
  } = useForm<Inputs>({
    defaultValues: {
      content: "",
      // "Proudly presenting 𝐕𝐢𝐜𝐭𝐢𝐨𝐧 𝐖𝐨𝐫𝐥𝐝 𝐖𝐢𝐝𝐞 𝐂𝐡𝐚𝐢𝐧 🌐 - reimagining everything you thought you knew. Scale beyond limits, enhance security, embrace liberty, foster win-win for all, and unlock collective value creation.",
      author: "dungnguyen"
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);
    console.log({ data });
    const { error, post } = await PostsAPI.createPost(
      data.author,
      data.content
    );
    console.log(" Create post ok ");
    setLoading(false);
  };

  return (
    <div className="flex items-start gap-4 w-full">
      <img
        className="rounded-full w-12 h-12 mr-2"
        alt={userInfo?.fullname}
        srcSet={`https://picsum.photos/80/80?random=123`}
      />
      <form
        className="w-full flex item-centers gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          render={({ field }) => (
            <InputArea
              className="w-full focus:bg-background-secondary hover:bg-background-secondary"
              rowsInput={3}
              isBlock
              placeholder="What on your mind?"
              {...field}
            />
          )}
          control={control}
          name="content"
        />
        <Button
          type="submit"
          size="sm"
          //   isLoading={loading}
          disabled={!isDirty || !isValid || loading}
          className="h-auto px-1"
        >
          <Icon iconName="arrow_right" />
        </Button>
      </form>
    </div>
  );
};

export default UploadPost;

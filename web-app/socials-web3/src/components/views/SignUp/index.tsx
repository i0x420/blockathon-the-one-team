"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";
import { AccountAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  nftid: string;
  fullname: string;
};

const SignUpScreen = () => {
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
      username: "dungnguyen",
      password: "123456",
      nftid: "1",
      fullname: "Nguyễn Văn A",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log({ data });
    const { error, userInfo: accountInfo } = await AccountAPI.createAccount(
      data.username,
      data.password,
      data.fullname
    );
    const { error: error2, userInfo: accountInfoNFT } = await AccountAPI.updateUserNFT(
      data.username,
      data.nftid
    );
    console.log({ accountInfoNFT, error2 });

    if (!error && accountInfo[0] && !error2) {
      setUserInfo(accountInfo[0]);
      router.push("/");
    } else {
      console.log({ error: "Sign up failed " });

      setUserInfo(null);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field }) => (
              <InputGroup
                label="Full name"
                isRequired
                errorMessage={get(errors, "fullname")?.message}
              >
                <Input isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="fullname"
          />
          <Controller
            render={({ field }) => (
              <InputGroup
                label="Username"
                isRequired
                errorMessage={get(errors, "username")?.message}
              >
                <Input isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="username"
          />
          <Controller
            render={({ field }) => (
              <InputGroup
                label="Password"
                isRequired
                errorMessage={get(errors, "password")?.message}
              >
                <Input isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="password"
          />
          <Controller
            render={({ field }) => (
              <InputGroup
                label="NFT ID"
                isRequired
                errorMessage={get(errors, "nftid")?.message}
              >
                <Input isBlock {...field} />
              </InputGroup>
            )}
            control={control}
            name="nftid"
          />
          <Button type="submit" isLoading={loading}>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;

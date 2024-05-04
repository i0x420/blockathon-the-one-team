"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputGroup } from "@/components/ui/InputGroup";
import { AccountAPI } from "@/services/apis";
import { useUserStore } from "@/stores/useUserStore";
import { get } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  nftid: string;
};

const SignInScreen = () => {
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
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log({ data });
    const { error, userInfo: accountInfo } = await AccountAPI.getUserByNFT(
      data.nftid
    );

    if (!error && accountInfo[0]?.password === data?.password) {
      setUserInfo(accountInfo[0]);
      router.push("/");
    } else {
      console.log({ error: "Login failed " });

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
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;

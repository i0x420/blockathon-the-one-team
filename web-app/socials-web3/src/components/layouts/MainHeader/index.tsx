"use client";

import Link from "next/link";

// components
import ConnectWallet from "./ConnectWallet";
import NavMenu from "./NavMenu";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { IconSvg } from "@/components/ui/IconSvg";
import { CreateCommunityButton } from "@/components/views/Home/components/CreateCommunityModal";

const MainHeader = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const router = useRouter();

  const logout = () => {
    setUserInfo(null);
    router.push("/sign-in");
  };

  return (
    <header className="flex items-center px-4 lg:px-6 h-header bg-background-primary fixed top-0 left-0 w-full z-50">
      {/* header left */}
      <div className="flex items-center flex-1">
        <Link prefetch={false} href="/" className="mr-8 ipadpro:mr-4">
          <div className="min-w-[theme(spacing.28)] ipad:min-w-0">
            <IconSvg.Logo />
          </div>
        </Link>
        <NavMenu />
      </div>

      {/* header right */}
      <div className="flex items-center gap-4 phone:gap-1 text-sm">
        <ConnectWallet />
      </div>
    </header>
  );
};

export default MainHeader;

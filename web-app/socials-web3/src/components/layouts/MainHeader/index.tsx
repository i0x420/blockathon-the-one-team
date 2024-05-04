"use client";

import Link from "next/link";

// components
import ConnectWallet from "./ConnectWallet";
import NavMenu from "./NavMenu";

const MainHeader = () => {
  return (
    <header className="flex items-center px-4 lg:px-6 h-header bg-background-primary fixed top-0 left-0 w-full z-50">
      {/* header left */}
      <div className="flex items-center flex-1">
        <Link prefetch={false} href="/" className="mr-4 ipadpro:mr-2">
          <div className="min-w-[theme(spacing.28)] ipad:min-w-0">
            Theme logo
            {/* <ThemeLogo className="hidden lg:block" /> */}
          </div>
          {/* <Image
            src="/images/logos/logo-simple.svg"
            alt="Dagora"
            width={35}
            height={35}
            className="lg:hidden"
          /> */}
        </Link>
        <NavMenu />
      </div>

      {/* header right */}
      <div className="flex items-center gap-4 phone:gap-1 text-sm">
        <ConnectWallet
          className="hidden lg:flex"
          title={"common_connect_wallet"}
        />
      </div>
    </header>
  );
};

export default MainHeader;

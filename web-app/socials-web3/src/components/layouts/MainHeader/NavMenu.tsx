import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { useWallet } from "@coin98-com/wallet-adapter-react";

type NavConfig = {
  label: string;
  href: string;
  origin?: string;
  hideMobile?: boolean;
  hidden?: boolean;
};

// constants

const NavMenu = ({
  className,
  classNameItem,
  customLinks,
  onToggle
}: {
  className?: string;
  classNameItem?: string;
  customLinks?: typeof navConfigs;
  onToggle?: () => void;
}) => {
  const { connected } = useWallet();
  const pathname = usePathname();
  const { userInfo } = useUserStore();

  const activeWallet = "";

  const onConnect = () => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    showModalConnectWallet();
  };
  const handleToggle = () => {
    onToggle && onToggle();
  };
  const showModalConnectWallet = () => {
    // window.openModal({
    //   title: "home_instruction_1",
    //   iconClose: true,
    //   content: <ModalConnectWallet />,
    //   size: "lg",
    // });
  };

  const navConfigs: NavConfig[] = [
    {
      label: "Profile",
      href: "/profile"
    },
    {
      label: "Sign up",
      href: "/sign-up",
      hidden: !Boolean(userInfo?.username) && connected
    },
    {
      label: "Sign in",
      href: "/sign-in",
      hidden: !Boolean(userInfo?.username) && connected
    }
  ];

  return (
    <nav
      className={twMerge(
        "flex items-center gap-8 ipadpro:gap-3 ipad:gap-8",
        className
      )}
      onClick={handleToggle}
    >
      {navConfigs
        .filter(nav => nav.hidden)
        .map(config => {
          const isActive =
            config.href === pathname || pathname.includes(config?.origin);
          const checkConnectCreate = false;

          return (
            <Link
              prefetch={false}
              key={config.label}
              href={config.href}
              className={twMerge(
                "text-base font-semibold hover:text-brand-primary transition whitespace-nowrap",
                isActive && "text-brand-primary",
                config.hideMobile && "ipad:hidden",
                classNameItem
              )}
              onClick={checkConnectCreate ? onConnect() : () => {}}
            >
              {config.label}
            </Link>
          );
        })}
    </nav>
  );
};

export default NavMenu;

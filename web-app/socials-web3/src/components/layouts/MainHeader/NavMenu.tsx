import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

type NavConfig = {
  label: string;
  href: string;
  origin?: string;
  hideMobile?: boolean;
};

// constants
const navConfigs: NavConfig[] = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Sign up",
    href: "/sign-up",
  },
  {
    label: "Sign in",
    href: "/sign-in",
  },
];

const NavMenu = ({
  className,
  classNameItem,
  customLinks,
  onToggle,
}: {
  className?: string;
  classNameItem?: string;
  customLinks?: typeof navConfigs;
  onToggle?: () => void;
}) => {
  const pathname = usePathname();

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

  return (
    <nav
      className={twMerge(
        "flex items-center gap-8 ipadpro:gap-3 ipad:gap-8",
        className
      )}
      onClick={handleToggle}
    >
      {(customLinks || navConfigs).map((config) => {
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

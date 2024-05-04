import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon, IconSize } from "./Icon";

interface CopyIconProps {
  name?: string;
  iconSize?: IconSize;
  checkClassName?: string;
  iconClassName?: string;
  isNoCheckIcon?: boolean;
  isNoTextCopied?: boolean;
  text: string;
  classNameIconChecked?: string;
}

const CopyIcon = ({
  name = "copy",
  iconSize = "base",
  checkClassName,
  iconClassName,
  isNoCheckIcon = false,
  isNoTextCopied = false,
  text,
  classNameIconChecked
}: CopyIconProps) => {
  // states
  const [isCopying, setIsCopying] = useState<boolean>(false);

  // functions
  const handleCopyText = (address: string) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsCopying(true);
    window.navigator.clipboard.writeText(address);

    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  };

  if (isCopying) {
    return (
      <div className={twMerge("flex items-center", checkClassName)}>
        {!isNoCheckIcon && (
          <Icon
            className={classNameIconChecked}
            size={iconSize}
            iconName="check-circle"
          />
        )}
        {!isNoTextCopied && <span className="ml-2">Copied</span>}
      </div>
    );
  }

  return (
    <Icon
      className={iconClassName}
      iconName={name}
      size={iconSize}
      onClick={handleCopyText(text)}
    />
  );
};

export default CopyIcon;

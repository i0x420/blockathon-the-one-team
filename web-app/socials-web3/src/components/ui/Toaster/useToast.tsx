import React from "react";

import { toast, TypeOptions, ToastOptions } from "react-toastify";
import { Icon } from "../Icon";

export type ToastParams = ToastOptions & {
  type?: TypeOptions;
  title?: string;
  description: string;
  hideIcon?: boolean;
  timeToLeave?: number;
};

const icons: any = {
  success: "check-filled",
  error: "info-filled",
  default: "info-filled",
  danger: "info-filled",
  warning: "info-filled"
};

export const useToast = () => {
  const toastNe = ({
    type = "success",
    title,
    description,
    hideIcon,
    timeToLeave = 2000,
    pauseOnHover = true,
    ...otherOptions
  }: ToastParams) => {
    toast(
      <div className="flex items-start gap-4 mr-2 text-sm">
        {!hideIcon && <Icon iconName={icons[type]} />}

        {/* toast body */}
        <div className="cho-nguyen-tran">
          {title && (
            <div className="text-md font-semibold leading-none mb-2">
              {title}
            </div>
          )}
          <div>{description}</div>
        </div>
      </div>,
      {
        type,
        bodyClassName: "p-0 m-0",
        autoClose: timeToLeave,
        pauseOnHover,
        ...otherOptions
      }
    );
  };

  return { toastNe };
};

"use client";

import {
  ToastClassName,
  ToastContainerProps,
  ToastContainer as ToastifyContainer,
  TypeOptions
} from "react-toastify";
import { twMerge } from "tailwind-merge";
import { Icon } from "../Icon";

const toastClassName = {
  success: "bg-green",
  error: "bg-red",
  info: "bg-blue",
  default: "bg-background-primary",
  warning: "bg-yellow"
};

const CloseToast = ({ closeToast }) => {
  return (
    <Icon
      iconName="close"
      className="hover:text-text-primary"
      onClick={closeToast}
    />
  );
};

export const Toaster = (props: ToastContainerProps) => {
  const getToastClassName = ({ type }: { type: TypeOptions }) =>
    twMerge(
      toastClassName[type],
      "relative flex justify-between px-4 py-6 mb-4 min-h-6 rounded-lg overflow-hidden cursor-pointer"
    );

  return (
    <ToastifyContainer
      icon={false}
      className="w-auto sm:w-[25rem] top-header phone:right-0 p-0"
      toastClassName={getToastClassName as ToastClassName}
      closeButton={CloseToast}
      hideProgressBar
      {...props}
    />
  );
};

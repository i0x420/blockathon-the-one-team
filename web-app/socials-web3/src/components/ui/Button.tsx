import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonColors = "primary" | "secondary" | "secondary-reverse";
export type ButtonSize = "sm" | "base" | "lg";
type ButtonVariants = "solid" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors;
  size?: ButtonSize;
  isLoading?: boolean;
  isBlock?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  suffix?: React.ReactNode;
  variant?: ButtonVariants;
}

export const Button = ({
  children = "button",
  size = "base",
  color = "primary",
  isLoading,
  isBlock,
  disabled,
  startIcon,
  endIcon,
  suffix,
  className,
  variant = "solid",
  ...props
}: ButtonProps) => {
  const colors = {
    primary: "bg-brand-primary text-white hover:bg-brand-hover ",
    secondary: "bg-background-secondary hover:bg-background-hover",
    "secondary-reverse":
      "text-reverse-text-primary bg-reverse-background-secondary hover:bg-background-hover",
  };

  const variants = {
    ghost: "bg-transparent",
    solid: "",
  };

  const variantsDisabled = {
    primary: "disabled:bg-brand-disabled",
    secondary: "disabled:background-secondary hover:bg-background-secondary",
    "secondary-reverse": "",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      className={twMerge(
        "flex items-center justify-center gap-3 min-w-min px-4 h-10 rounded transition whitespace-nowrap disabled:cursor-not-allowed disabled:text-text-disabled font-semibold phone:text-xs capitalize",
        color && colors[color],
        color && isDisabled && variantsDisabled[color],
        variant && variants[variant],
        size === "sm" && "h-9",
        size === "lg" && "h-14 ipad:h-10",
        isBlock && "w-full",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <div>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
          </span>
        </div>
      ) : (
        <>
          {startIcon && (
            <span className="flex items-center justify-center">
              {startIcon}
            </span>
          )}
          {children}
          {suffix}
          {endIcon && (
            <span className="flex items-center justify-center">{endIcon}</span>
          )}
        </>
      )}
    </button>
  );
};

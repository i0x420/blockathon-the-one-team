import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type IconSize = 'xs' | 'sm' | 'base' | 'md' | 'lg';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: IconSize;
  className?: string;
  iconName: string;
  isChainIcon?: boolean;
  onClick?: (e?: any) => void;
}

export const Icon = ({
  size = 'base',
  iconName,
  isChainIcon,
  className,
  onClick,
  ...props
}: IconProps) => {
  const iconSizes = {
    xs: 'text-sm',
    sm: 'text-base phone:text-sm',
    base: 'text-lg phone:text-md',
    md: 'text-md phone:text-base',
    lg: 'text-xl phone:text-lg',
  };
  return (
    <span
      className={twMerge(
        'inline-block leading-none',
        iconSizes[size],
        isChainIcon ? `icon-${iconName}` : `icon-app_${iconName}`,
        onClick && 'hover:text-brand-primary cursor-pointer',
        className,
      )}
      onClick={onClick}
      aria-hidden="true"
      {...props}
    />
  );
};

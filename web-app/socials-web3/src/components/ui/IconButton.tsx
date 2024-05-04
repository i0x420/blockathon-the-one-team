'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from './Button';
import { Icon, IconSize } from './Icon';

type IconButtonVariant = 'square' | 'circle';

interface IconButtonProps {
  variant?: IconButtonVariant;
  iconName: string;
  isTransparent?: boolean;
  onClick?: (e?: any) => void;
  className?: string;
  iconClassName?: string;
  iconSize?: IconSize;
  disabled?: boolean;
}

export const IconButton = ({
  variant,
  iconName,
  isTransparent,
  className,
  iconClassName,
  iconSize = 'sm',
  disabled,
  onClick,
}: IconButtonProps) => {
  return (
    <Button
      color="secondary"
      className={twMerge(
        'flex items-center justify-center px-0 group/icon',
        iconSize === 'base' ? 'w-10 h-10' : 'w-8 h-8',
        variant === 'circle' && 'rounded-full',
        isTransparent && 'bg-transparent',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon iconName={iconName} size={iconSize} className={iconClassName} />
    </Button>
  );
};

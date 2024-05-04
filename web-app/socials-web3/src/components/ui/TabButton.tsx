import React, { forwardRef, ForwardedRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type VariantType = 'background' | 'line';

interface TabButtonProps {
  variant?: VariantType;
  isSelected?: boolean;
  isBlock?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: 'base' | 'lg';
  onClick?: (e: any) => void;
}

export const TabButton = forwardRef(
  (
    {
      children,
      variant = 'background',
      isSelected,
      isBlock,
      className,
      size = 'base',
      onClick,
    }: TabButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const variants = {
      background: 'hover:bg-background-hover',
      line: 'after:absolute after:w-0  after:h-[2px] after:bottom-0 after:left-0 after:bg-brand-primary after:rounded-xl after:transition-all after:duration-200 hover:text-brand-primary',
    };

    const selected = {
      background:
        'bg-reverse-background-primary text-reverse-text-primary hover:bg-reverse-background-primary',
      line: 'after:w-full text-brand-primary ',
    };

    const sizes = {
      base: 'h-10',
      lg: 'h-14',
    };

    return (
      <button
        className={twMerge(
          'px-4 font-semibold rounded-lg outline-none whitespace-nowrap relative transition',
          variants[variant],
          sizes[size],
          isSelected && selected[variant],
          isBlock && 'w-full',
          className,
        )}
        type="button"
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

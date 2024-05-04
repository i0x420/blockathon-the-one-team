'use client';

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
  useState,
  useCallback,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { IconButton } from './IconButton';
import { isEmpty } from 'lodash';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  value?: string;
  contentRight?: React.ReactNode;
  contentLeft?: React.ReactNode;
  isBlock?: boolean;
  variant?: 'full' | 'ghost';
  containerClassName?: string;
  contentLeftClassName?: string;
  contentRightClassName?: string;
  validate?: any;
  customMessage?: (type: string) => React.ReactNode;
  onChangeValue?: (value: string) => void;
}

const variants = {
  full: 'bg-background-input hover:bg-background-input-hover focus:bg-background-input-hover',
  ghost: 'bg-transparent',
};

const contentClassName =
  'flex absolute top-1/2 -translate-y-1/2 text-text-secondary cursor-pointer';

export const Input = forwardRef(
  (
    {
      id,
      className,
      containerClassName,
      placeholder = 'Placeholder',
      isBlock,
      value,
      clearable,
      contentRight,
      contentLeft,
      variant = 'full',
      validate,
      contentLeftClassName,
      contentRightClassName,
      customMessage,
      onChangeValue,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    // states
    const [errType, setErrType] = useState<string>('');

    // functions
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue && onChangeValue(e.target.value);
      handleValidate(e.target.value);
    };

    const handleClearInput = () => {
      onChangeValue && onChangeValue('');
    };

    const handleValidate = useCallback(
      (value: string) => {
        if (!validate || isEmpty(validate)) return;
        for (const callback of Object.values(validate)) {
          if (typeof callback === 'function') {
            const response = callback(value);
            const isErr = Boolean(response);
            setErrType(response);
            if (isErr) return;
          }
        }
      },
      [validate],
    );

    return (
      <div
        className={twMerge(
          'input-container',
          isBlock ? 'w-full' : 'inline-block',
          containerClassName,
        )}
      >
        <div className="relative">
          {contentLeft && (
            <div
              className={twMerge(
                contentClassName,
                'left-2',
                contentLeftClassName,
              )}
            >
              {contentLeft}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            className={twMerge(
              'w-full h-10 px-4 outline-none border-none rounded-lg duration-100',
              'placeholder:text-sm placeholder:text-text-placeholder placeholder:relative placeholder:duration-300 placeholder:opacity-100 placeholder:left-0 focus:placeholder:opacity-0 focus:placeholder:left-2.5', // styled placeholder
              variants[variant],
              contentLeft && 'pl-8',
              (contentRight || clearable) && 'pr-8',
              className,
              //disable
              'disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none',
            )}
            value={value}
            onChange={handleChangeValue}
            {...props}
          />

          {clearable && value && (
            <IconButton
              iconName="close"
              className={twMerge(contentClassName, 'right-2')}
              variant="circle"
              isTransparent
              onClick={handleClearInput}
            />
          )}

          {contentRight && (
            <div
              className={twMerge(
                contentClassName,
                'right-2',
                contentRightClassName,
              )}
            >
              {contentRight}
            </div>
          )}

          {Boolean(errType) && customMessage && customMessage(errType)}
        </div>
      </div>
    );
  },
);

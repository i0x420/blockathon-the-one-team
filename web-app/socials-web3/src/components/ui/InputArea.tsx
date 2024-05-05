'use client';

import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputAreaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  rowsInput: number;
  clearable?: boolean;
  value?: string;
  isBlock?: boolean;
  containerClassName?: string;
  isDisable?: boolean;
  isNoStyleFocus?: boolean;
  onChangeValue?: (value: string) => void;
}

export const InputArea = ({
  rowsInput,
  id,
  className,
  containerClassName,
  placeholder = 'Placeholder',
  isBlock,
  value,
  isDisable,
  isNoStyleFocus = false,
  onChangeValue,
  ...props
}: InputAreaProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue && onChangeValue(e.target.value);
  };

  return (
    <div
      className={twMerge(
        'input-container',
        isBlock ? 'w-full' : 'inline-block',
        containerClassName,
      )}
    >
      <div className="relative">
        <textarea
          rows={rowsInput}
          id={id}
          placeholder={placeholder}
          className={twMerge(
            !isNoStyleFocus && 'focus:bg-background-hover focus:placeholder:opacity-0 focus:placeholder:left-2.5',
            'w-full min-h-[4rem] p-4 bg-background-secondary hover:bg-background-hover outline-none border-none rounded-lg duration-100 resize-none',
            'placeholder:text-sm placeholder:text-text-placeholder placeholder:relative placeholder:opacity-100 placeholder:left-0', // styled placeholder
            className,
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none',
          )}
          value={value}
          onChange={handleChangeValue}
          disabled={isDisable}
          {...props}
        />
      </div>
    </div>
  );
};

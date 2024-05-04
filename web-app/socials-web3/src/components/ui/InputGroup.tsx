import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputGroupProps {
  children?: React.ReactNode;
  label?: string;
  labelClassName?: string;
  errorMessage?: string;
  customMessage?: React.ReactNode;
  id?: string;
  isRequired?: boolean;
  isDisable?: boolean;
}

export const InputGroup = ({
  id,
  label,
  labelClassName,
  errorMessage,
  customMessage,
  isRequired = false,
  children,
  isDisable,
}: InputGroupProps) => {
  return (
    <div className="inline-block w-full">
      {label && (
        <label
          htmlFor={id}
          className={twMerge('inline-block mb-4', labelClassName)}
        >
          {label}
        </label>
      )}
      {isRequired && <span className="ml-1 text-red">*</span>}
      <div
        className={twMerge(
          isDisable && 'opacity-30 pointer-events-none cursor-not-allowed',
        )}
      >
        {children}
      </div>
      {customMessage}
      {errorMessage && (
        <span className="text-red block mt-2 text-sm text-right">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

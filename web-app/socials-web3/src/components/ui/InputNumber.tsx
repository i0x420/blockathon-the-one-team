import React from 'react';
import {
  NumericFormat,
  NumericFormatProps,
  NumberFormatValues,
} from 'react-number-format';

import { Input, InputProps } from './Input';

type InputNumberProps = NumericFormatProps &
  InputProps & {
    maxDecimal?: number;
    customValidate?: (value: NumberFormatValues) => boolean;
  };

const MAX_NUMBER = 100_000_000_000;

export const InputNumber = ({
  maxDecimal = 6,
  onChangeValue,
  customValidate,
  ...props
}: InputNumberProps) => {
  const validateNumber = (value: NumberFormatValues) => {
    const { floatValue = 0, value: inputValue } = value;

    if (inputValue === '.') return false;

    return floatValue < MAX_NUMBER;
  };

  const handleChangeValue = (e: any) => {
    onChangeValue && onChangeValue(e.value as string);
  };

  return (
    <NumericFormat
      customInput={Input}
      thousandSeparator=","
      decimalScale={maxDecimal}
      isAllowed={customValidate || validateNumber}
      onValueChange={handleChangeValue}
      allowNegative={false}
      {...props}
    />
  );
};

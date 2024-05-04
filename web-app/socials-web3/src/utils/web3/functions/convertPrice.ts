import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const convertWeiToBalance = (
  amount: string | number,
  decimal = 18,
): BigNumber => {
  const bigDecimal = BigNumber(10).pow(decimal);
  const convertedAmount = new BigNumber(amount);

  return convertedAmount.div(bigDecimal);
};

export const convertBalanceToWei = (
  amount: string,
  decimal = 18,
): BigNumber => {
  const bigDecimal = BigNumber(10).pow(decimal);
  const convertedAmount = BigNumber(amount);

  return convertedAmount.multipliedBy(bigDecimal);
};

/**
 * Returns format number.
 *
 * @param value - The value to format
 * @param isTokenAmount - For mat decimal is 4
 * @param currency - For mat decimal is 2
 * @isCompact - For short value if value greater 1000 return 1k
 * @returns The string after format
 *
 */
export const formatReadableNumber = (
  value: number | string,
  options: {
    isTokenAmount?: boolean;
    locale?: string;
    currency?: string;
    isCompact?: boolean;
    threshold?: number;
    customDecimal?: number | null;
  } = {},
) => {
  const parseNumber = typeof value === 'string' ? parseFloat(value) : value;
  const {
    isTokenAmount = false,
    locale = 'en-US',
    isCompact = false,
    threshold = 1e4,
    customDecimal = null,
  } = options;

  const isOverThreshold = parseNumber >= threshold;

  let decimal = isTokenAmount ? 4 : 2;

  if (isOverThreshold && isCompact) {
    decimal = 0;
  }

  let formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: customDecimal || decimal,

    ...(isOverThreshold && isCompact && { notation: 'compact' }),
  }).format(parseNumber);

  return formattedNumber;
};

export const convertPriceByCurrency = (
  value: number | string,
  options: { isCompact?: boolean } = {},
) => {
  const { isCompact = false } = options;
  const currencySymbol = '$';

  return `${currencySymbol}${formatReadableNumber(value, { isCompact })}`;
};

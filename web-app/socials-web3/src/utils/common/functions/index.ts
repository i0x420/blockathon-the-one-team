import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { get, identity, pickBy } from "lodash";
import { isClient } from "../constants";

enum CHAIN_KIND {
  EVM = "evm",
  COSMWASM = "cosmwasm",
  SOLANA = "solana",
  UNKNOWN = "unknown",
}

export interface DataResponse<T = any> {
  isErr: boolean;
  message?: string;
  data?: T;
}

// response object
export const genErrorResponse = (error: any): DataResponse<null> => {
  const message =
    typeof error === "string" ? error : error?.message || "system_error";
  return { isErr: true, message };
};

export const genSuccessResponse = <T>(data: T): DataResponse<T> => {
  return { isErr: false, data };
};

// storage functions
export const setLocalStorage = <T = any>(key: string, value: T) => {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): string | null => {
  if (!isClient) return null;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeLocalStorage = (key: string) => {
  if (!isClient) return;
  return localStorage.removeItem(key);
};

export const getCookie = (key: string) => {
  const value = Cookies.get(key);

  if (!isClient) return value;
  return value ? JSON.parse(value) : null;
};

export const setCookie = <T>(key: string, value: T) => {
  if (!isClient) return;

  Cookies.set(key, JSON.stringify(value), {
    expires: 365,
  });
};

export const getLength = (str: string | any[]): number => {
  if (!str) return 0;
  if (typeof str === "object" && !Array.isArray(str)) {
    return Object.keys(str).length;
  }
  return get(str, "length", 0);
};

export const generateId = (isNumbersOnly = false): string => {
  let text = "";
  const possible = isNumbersOnly
    ? "0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const toCountdownTime = (
  time: any,
  fixed = 2
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const numbers = parseInt(time, 10); // don't forget the second param
  let hours = Math.floor(numbers / 3600);
  let minutes = Math.floor((numbers - hours * 3600) / 60);
  let seconds = numbers - hours * 3600 - minutes * 60;

  const days = Math.floor(hours / 24);
  hours -= days * 24;
  if (hours < 10) {
    hours = +("0".repeat(fixed - 1) + hours);
  }
  if (minutes < 10) {
    minutes = +("0".repeat(fixed - 1) + minutes);
  }
  if (seconds < 10) {
    seconds = +("0".repeat(fixed - 1) + seconds);
  }
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const sleep = (ms = 500): Promise<void> => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const cleanObject = (object: any): any => pickBy(object, identity);

export const isValidURL = (url: string) => {
  try {
    const newURL = new URL(url);
    return !!newURL;
  } catch (e) {
    return false;
  }
};

export const intervalUntilDone = (
  fn: () => Promise<any>,
  time: number = 1000,
  limit: number = 60
) => {
  const now = dayjs().unix();
  return new Promise((resolve, reject) => {
    let timer = setInterval(async () => {
      const isExpired = dayjs().unix() - now >= limit;
      if (isExpired) {
        timer && clearInterval(timer);
        reject({});
      }

      try {
        const response = await fn();
        if (response) {
          clearInterval(timer);
          resolve(response);
        }
      } catch (error) {
        console.log({ error });
        // reject({});
      }
    }, time);
  });
};

export const mathBN: {
  [key in
    | "add"
    | "subtract"
    | "multiply"
    | "divide"
    | "isGreaterThanOrEqualTo"
    | "isGreaterThanTo"]: (
    x: BigNumber.Value,
    y: BigNumber.Value
  ) => string | boolean;
} = {
  add: function (x, y): string {
    return new BigNumber(x).plus(new BigNumber(y)).toString();
  },
  subtract: function (x, y): string {
    return new BigNumber(x).minus(new BigNumber(y)).toString();
  },
  multiply: function (x, y): string {
    return new BigNumber(x).multipliedBy(new BigNumber(y)).toString();
  },
  divide: function (x, y): string {
    return new BigNumber(x).div(new BigNumber(y)).toString();
  },
  isGreaterThanTo: function (x, y): boolean {
    return new BigNumber(x).isGreaterThan(new BigNumber(y));
  },
  isGreaterThanOrEqualTo: function (x, y): boolean {
    return new BigNumber(x).isGreaterThanOrEqualTo(new BigNumber(y));
  },
};

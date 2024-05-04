import { APIResponse } from '@/services/types/api';
import Cookies from 'js-cookie';

// API functions
export const genErrorResponse = (message: string): APIResponse<null> => {
  return { isErr: true, err: message };
};

export const genSuccessResponse = <T>(data: T): APIResponse<T> => {
  return { isErr: false, data };
};

// Storage
export const getCookie = (key: string) => {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (e) {
    return Cookies.get(key);
  }
};

export const setCookie = <T>(key: string, value: T) => {
  Cookies.set(key, JSON.stringify(value), {
    expires: 365,
  });
};

"use client";

import React, { createContext, useContext } from "react";

// types
import { AccountContextValues, AccountProviderProps } from "./type";

const AccountContext = createContext({} as AccountContextValues);

export const AccountProvider = ({ children }: AccountProviderProps) => {
  return (
    <AccountContext.Provider value={{}}>{children}</AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);

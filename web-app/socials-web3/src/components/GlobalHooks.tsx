"use client";

import useInitData from "@/hooks/useInitData";
import { useEffect } from "react";

const GlobalHooks = () => {
  useInitData();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return null;
};

export default GlobalHooks;

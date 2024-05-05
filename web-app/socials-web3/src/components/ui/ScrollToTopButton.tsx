"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

// components
import { Icon } from "./Icon";

const ScrollToTopButton = () => {
  // states
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleShowButton = (): void => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);

    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  // functions
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={twMerge(
        "fixed bottom-20 md:bottom-12 right-6 w-10 md:w-12 h-10 md:h-12 bg-background-secondary rounded-full cursor-pointer flex items-center justify-center duration-200 hover:scale-90 z-10 shadow-[rgba(0, 0, 0, 0.1)_0px_5px_15px]",
        !showTopBtn && "opacity-0 pointer-events-none"
      )}
      onClick={() => handleGoToTop()}
      aria-hidden="true"
    >
      <Icon iconName="arrow_up" className="text-reverse-background-primary" />
    </div>
  );
};

export default ScrollToTopButton;

"use client";

import React, { useState, useEffect } from "react";
import IntroAnimation from "../components/IntroAnimation";
import Navbar from "../components/Navbar";
import MobileComingSoon from "../components/MobileComingSoon";
import {
  isMobile as deviceIsMobile,
  isTablet as deviceIsTablet,
} from "react-device-detect";

export default function ClientIntroHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentPrep, setContentPrep] = useState(false);
  const [shouldShowMobileUI, setShouldShowMobileUI] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const checkIsMobileView = () => {
      return deviceIsMobile || deviceIsTablet || window.innerWidth < 768;
    };

    setShouldShowMobileUI(checkIsMobileView());

    const handleResize = () => {
      setShouldShowMobileUI(checkIsMobileView());
    };

    window.addEventListener("resize", handleResize);

    const prepareTimer = setTimeout(() => {
      setContentPrep(true);
    }, 50);

    return () => {
      clearTimeout(prepareTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAnimationComplete = () => {
    setShowIntro(false);
    setShowNavbar(true);

    if (!shouldShowMobileUI) {
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      {showIntro && (
        <IntroAnimation
          onAnimationComplete={handleAnimationComplete}
          text="designed and developed by Gino"
          displayDuration={2500}
        />
      )}

      {shouldShowMobileUI ? (
        <div
          className={`
            transition-opacity duration-500 ease-in-out
            ${
              showIntro
                ? "opacity-0 pointer-events-none"
                : "opacity-100 delay-100"
            }
            h-full w-full
          `}
        >
          <MobileComingSoon />
        </div>
      ) : (
        <>
          <Navbar
            className={`
              fixed top-0 left-0 w-full z-50
              transition-transform duration-700 ease-in-out
              ${showNavbar ? "translate-y-0" : "-translate-y-full"}
            `}
          />

          <div
            className={`
              antialiased flex flex-col min-h-screen min-w-[1024px]
              transition-opacity duration-500 ease-in-out
              ${
                showIntro && contentPrep
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }
              ${!showIntro ? "delay-100" : ""}
            `}
          >
            <main className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden pt-[5.5rem]">
              <div className="mx-auto max-w-[1440px] w-full">{children}</div>
            </main>
          </div>
        </>
      )}
    </>
  );
}

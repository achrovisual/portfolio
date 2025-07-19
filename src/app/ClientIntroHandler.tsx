"use client";

import React, { useState, useEffect } from "react";
import IntroAnimation from "../components/IntroAnimation";
import Navbar from "../components/Navbar";
import MobileComingSoon from "../components/MobileComingSoon";
import {
  isMobile as deviceIsMobile,
  isTablet as deviceIsTablet,
} from "react-device-detect";

import clientLogger from "@/lib/clientLogger";

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
    clientLogger.info("ClientIntroHandler mounted.");

    if (typeof window === "undefined") {
      clientLogger.warn(
        "ClientIntroHandler useEffect running in non-browser environment.",
        { typeofWindow: typeof window }
      );
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    clientLogger.debug("Body overflow set to hidden.");

    const checkIsMobileView = () => {
      const isMobileView =
        deviceIsMobile || deviceIsTablet || window.innerWidth < 768;
      clientLogger.debug("Checking mobile view status.", {
        deviceIsMobile,
        deviceIsTablet,
        windowWidth: window.innerWidth,
        isMobileViewCalculated: isMobileView,
      });
      return isMobileView;
    };

    setShouldShowMobileUI(checkIsMobileView());

    const handleResize = () => {
      const newMobileUIState = checkIsMobileView();
      if (newMobileUIState !== shouldShowMobileUI) {
        clientLogger.info("Viewport resized, mobile UI state changed.", {
          oldState: shouldShowMobileUI,
          newState: newMobileUIState,
          currentWidth: window.innerWidth,
        });
        setShouldShowMobileUI(newMobileUIState);
      }
    };

    window.addEventListener("resize", handleResize);
    clientLogger.debug("Resize event listener added.");

    const prepareTimer = setTimeout(() => {
      setContentPrep(true);
      clientLogger.info("Content preparation delay complete.");
    }, 50);

    return () => {
      clearTimeout(prepareTimer);
      document.body.style.overflow = originalOverflow;
      clientLogger.debug("Body overflow restored to original value.");
      window.removeEventListener("resize", handleResize);
      clientLogger.debug("Resize event listener removed.");
      clientLogger.info("ClientIntroHandler unmounted.");
    };
  }, [shouldShowMobileUI]);

  const handleAnimationComplete = () => {
    setShowIntro(false);
    setShowNavbar(true);
    clientLogger.info("Intro animation complete.", {
      showIntro: false,
      showNavbar: true,
    });

    if (!shouldShowMobileUI) {
      document.body.style.overflow = "";
      clientLogger.debug("Body overflow restored for desktop view.");
    } else {
      clientLogger.debug("Body overflow remains hidden for mobile view.");
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

"use client";

import React, { useState, useEffect } from "react";
import IntroAnimation from "../components/IntroAnimation";
import Navbar from "../components/Navbar";
import MobileComingSoon from "../components/MobileComingSoon";

export default function ClientIntroHandler({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentPrep, setContentPrep] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const checkIsMobile = () => {
      const mobileRegex =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
      const tabletRegex = /android|ipad|playbook|silk/i;

      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;

      return (
        mobileRegex.test(userAgent) ||
        tabletRegex.test(userAgent) ||
        window.innerWidth < 768
      );
    };

    setIsMobile(checkIsMobile());

    window.addEventListener("resize", () => {
      setIsMobile(checkIsMobile());
    });

    const prepareTimer = setTimeout(() => {
      setContentPrep(true);
    }, 50);

    return () => {
      clearTimeout(prepareTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("resize", () => {
        setIsMobile(checkIsMobile());
      });
    };
  }, []);

  const handleAnimationComplete = () => {
    setShowIntro(false);
    if (!isMobile) {
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

      {isMobile ? (
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
        <div
          className={`
            antialiased flex flex-col min-h-screen min-w-[1024px]
            transition-transform duration-500 ease-in-out
            ${
              showIntro && contentPrep
                ? "translate-y-full opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }
            ${!showIntro ? "delay-100" : ""}
          `}
        >
          <Navbar />
          <main className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden pt-[5.5rem]">
            <div className="mx-auto max-w-[1440px] w-full">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

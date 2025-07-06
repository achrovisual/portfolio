"use client";

import React, { useState, useEffect } from "react";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onAnimationComplete,
}) => {
  const [fadeActive, setFadeActive] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Determine initial dark mode status (client-side)
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isManualDark = document.documentElement.classList.contains("dark");
    const isManualLight = document.documentElement.classList.contains("light");

    if (isManualDark) {
      setDarkMode(true);
    } else if (isManualLight) {
      setDarkMode(false);
    } else {
      setDarkMode(prefersDark);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (
        !document.documentElement.classList.contains("light") &&
        !document.documentElement.classList.contains("dark")
      ) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    const initialFadeInTimer = setTimeout(() => {
      setFadeActive(true);
    }, 100);

    const fadeOutAndSlideUpTimer = setTimeout(() => {
      setFadeActive(false);
      setSlideOut(true);
      const completionTimer = setTimeout(() => {
        onAnimationComplete();
      }, 500);
      return () => clearTimeout(completionTimer);
    }, 2000);

    return () => {
      clearTimeout(initialFadeInTimer);
      clearTimeout(fadeOutAndSlideUpTimer);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [onAnimationComplete]);
  const backgroundColor = darkMode ? "bg-black" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        ${backgroundColor}
        ${
          slideOut
            ? "transition-all duration-500 ease-in-out opacity-0 translate-y-[-100%]"
            : "transition-opacity duration-500 ease-in-out opacity-100 translate-y-0"
        }
        ${
          slideOut ? "pointer-events-none" : ""
        } /* Disable clicks on the intro after it starts sliding */
      `}
    >
      <p
        className={`text-2xl font-medium
          ${textColor}
          ${
            fadeActive
              ? "transition-opacity duration-500 ease-in-out opacity-100"
              : "transition-opacity duration-500 ease-in-out opacity-0"
          }
        `}
      >
        designed and developed by Gino
      </p>
    </div>
  );
};

export default IntroAnimation;

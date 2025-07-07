"use client";

import React, { useState, useEffect } from "react";

interface IntroAnimationProps {
  onAnimationComplete: () => void;
  text: string;
  displayDuration?: number;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onAnimationComplete,
  text,
  displayDuration = 2000,
}) => {
  const [fadeActive, setFadeActive] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  const [introBgColor, setIntroBgColor] = useState<string>("");
  const [introTextColor, setIntroTextColor] = useState<string>("");

  const getCssVariableValue = (variableName: string) => {
    if (typeof window !== "undefined" && document.documentElement) {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
    }
    return "";
  };

  useEffect(() => {
    setIntroBgColor(getCssVariableValue("--background"));
    setIntroTextColor(getCssVariableValue("--foreground"));

    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaQueryChange = () => {
      setIntroBgColor(getCssVariableValue("--background"));
      setIntroTextColor(getCssVariableValue("--foreground"));
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIntroBgColor(getCssVariableValue("--background"));
          setIntroTextColor(getCssVariableValue("--foreground"));
        }
      });
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true });
    }

    const initialFadeInTimer = setTimeout(() => {
      setFadeActive(true);
    }, 100);

    const fadeOutAndSlideUpTimer = setTimeout(() => {
      setFadeActive(false);
      setSlideOut(true);

      setTimeout(() => {
        onAnimationComplete();
      }, 500);
    }, displayDuration);

    return () => {
      clearTimeout(initialFadeInTimer);
      clearTimeout(fadeOutAndSlideUpTimer);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      observer.disconnect();
    };
  }, [onAnimationComplete, displayDuration]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        ${
          slideOut
            ? "transition-all duration-500 ease-in-out opacity-0 translate-y-[-100%]"
            : "transition-opacity duration-500 ease-in-out opacity-100 translate-y-0"
        }
        ${
          slideOut ? "pointer-events-none" : ""
        } /* Disable clicks on the intro after it starts sliding */
      `}
      style={{ backgroundColor: introBgColor }}
    >
      <p
        className={`text-md font-medium
          ${
            fadeActive
              ? "transition-opacity duration-500 ease-in-out opacity-100"
              : "transition-opacity duration-500 ease-in-out opacity-0"
          }
        `}
        style={{ color: introTextColor }}
      >
        {text}
      </p>
    </div>
  );
};

export default IntroAnimation;

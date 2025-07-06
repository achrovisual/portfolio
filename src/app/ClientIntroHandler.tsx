"use client";

import React, { useState, useEffect } from "react";
import IntroAnimation from "../components/IntroAnimation";
import Navbar from "../components/Navbar";

export default function ClientIntroHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentPrep, setContentPrep] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prepareTimer = setTimeout(() => {
      setContentPrep(true);
    }, 50);

    return () => {
      clearTimeout(prepareTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleAnimationComplete = () => {
    setShowIntro(false);

    document.body.style.overflow = "";
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
    </>
  );
}

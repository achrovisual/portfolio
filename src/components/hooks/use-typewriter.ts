"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text: string, speedMs = 35) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    console.log("typewriter effect fired, text:", text);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  return displayed;
}

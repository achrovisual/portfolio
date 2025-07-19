"use client";

import {
  isMobile,
  isTablet,
  isDesktop,
  isBrowser,
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
  mobileVendor,
  mobileModel,
} from "react-device-detect";

interface LogOptions {
  level?: "info" | "warn" | "error" | "debug";
  [key: string]: any;
}

const sendLogToServer = async (message: string, options: LogOptions) => {
  if (process.env.NODE_ENV === "development") {
    const method = options.level || "log";
    console[method](message, options);
  }

  try {
    const isWindowAvailable = typeof window !== "undefined";
    const deviceDetails = {
      isMobile,
      isTablet,
      isDesktop,
      isBrowser,
      browserName,
      browserVersion: fullBrowserVersion,
      osName,
      osVersion,
      mobileVendor,
      mobileModel,
      screenWidth: isWindowAvailable ? window.screen.width : undefined,
      screenHeight: isWindowAvailable ? window.screen.height : undefined,
      viewportWidth: isWindowAvailable ? window.innerWidth : undefined,
      viewportHeight: isWindowAvailable ? window.innerHeight : undefined,
      pixelRatio: isWindowAvailable ? window.devicePixelRatio : undefined,
    };

    await fetch("/api/log-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level: options.level || "info",
        message,
        path:
          typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : "N/A",
        correlationId:
          typeof document !== "undefined" &&
          document.head.querySelector('meta[name="x-correlation-id"]')
            ? document.head
                .querySelector('meta[name="x-correlation-id"]')
                ?.getAttribute("content") || "N/A"
            : "N/A",
        ...options,
        device: deviceDetails,
      }),
    });
  } catch (error) {
    console.error("Failed to send client log to server:", error);
  }
};

const clientLogger = {
  info: (message: string, options?: Omit<LogOptions, "level">) =>
    sendLogToServer(message, { ...options, level: "info" }),
  warn: (message: string, options?: Omit<LogOptions, "level">) =>
    sendLogToServer(message, { ...options, level: "warn" }),
  error: (message: string, options?: Omit<LogOptions, "level">) =>
    sendLogToServer(message, {
      ...options,
      level: "error",
      stack: new Error().stack,
    }),
  debug: (message: string, options?: Omit<LogOptions, "level">) =>
    sendLogToServer(message, { ...options, level: "debug" }),
};

export default clientLogger;

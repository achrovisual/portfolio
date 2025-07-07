import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function MobileComingSoon() {
  const profileImageSrc = "/avatar.png";

  const [statusColor, setStatusColor] = useState("var(--color-orange-status)");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const phtOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "Asia/Manila",
      };
      const phtHour = parseInt(
        now.toLocaleString("en-US", { ...phtOptions, hour: "numeric" })
      );

      const startHour = 8;
      const endHour = 17;

      if (phtHour >= startHour && phtHour < endHour) {
        setStatusColor("var(--color-green-status)");
      } else {
        setStatusColor("var(--color-orange-status)");
      }
    };

    updateStatus();

    const intervalId = setInterval(updateStatus, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const baseClasses = [
    "flex",
    "flex-row",
    "items-center",
    "p-2",
    "rounded-full",
    "transition-all",
    "duration-300",
    "ease-out",
    "cursor-pointer",
    "backdrop-blur-sm",
  ].join(" ");

  return (
    <div
      className={`
        antialiased flex flex-col items-center justify-center min-h-screen text-center
        bg-background text-foreground p-4
      `}
    >
      <div className="flex flex-col items-center justify-center p-4 gap-8 max-w-sm w-full">
        <div
          className={baseClasses}
          style={{ backgroundColor: "var(--button-background)" }}
        >
          <div className="relative">
            <div
              className="flex-shrink-0 w-28 h-28 rounded-full bg-cover bg-center flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
              style={
                profileImageSrc
                  ? { backgroundImage: `url('${profileImageSrc}')` }
                  : {}
              }
            ></div>

            <div
              className="absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-background"
              style={{ backgroundColor: statusColor }}
            ></div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-2xl font-extrabold mb-4 tracking-wide">
            Hey there!
          </h1>

          <p className="text-md md:text-md text-center mb-8 max-w-xs">
            I'm pouring my heart into crafting the perfect mobile experience for
            you. For now, please pop over to the desktop version – it's all
            ready and waiting!
          </p>
        </div>

        <div className="flex gap-4">
          <Button icon="mdi:github" href="https://github.com/achrovisual" />
          <Button
            icon="mdi:linkedin"
            href="https://www.linkedin.com/in/eugeniopastoral"
          />
        </div>
      </div>
    </div>
  );
}

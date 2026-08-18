"use client";

import { useState } from "react";

interface HeroBadgeProps {
  emoji: string;
  label: string;
  className?: string;
  enabled: boolean;
}

export default function HeroBadge({
  emoji,
  label,
  className = "",
  enabled,
}: HeroBadgeProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      className={`flex flex-row items-center h-10 md:h-14 rounded-lg shrink-0 overflow-hidden
        transition-all duration-300 ease-out
        ${isActive ? "w-auto justify-start px-3 md:px-4 gap-1.5 md:gap-2" : "w-10 md:w-14 justify-center px-0 gap-0"}
        ${enabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        ${className}`}
    >
      <span aria-hidden="true" className="shrink-0 text-sm md:text-2xl">
        {emoji}
      </span>
      <span
        className={`inline-block font-medium text-sm md:text-2xl whitespace-nowrap overflow-hidden transition-all duration-300
          ${isActive ? "w-auto opacity-100" : "w-0 opacity-0"}`}
      >
        {label}
      </span>
    </div>
  );
}

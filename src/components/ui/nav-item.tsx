"use client";

import { useState, useRef } from "react";
import type { ReactNode } from "react";

interface NavItemProps {
  href: string;
  ariaLabel: string;
  icon?: ReactNode;
  label?: string;
  external?: boolean;
  className?: string;
}

export default function NavItem({
  href,
  ariaLabel,
  icon,
  label,
  external = false,
  className = "",
}: NavItemProps) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const handlePointerEnter = () => {
    setIsActive(true);
    requestAnimationFrame(() => {
      ref.current?.getBoundingClientRect();
    });
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    requestAnimationFrame(() => {
      ref.current?.getBoundingClientRect();
    });
  };

  const isIconOnly = icon && !label;

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={ariaLabel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`flex items-center justify-center gap-2 rounded-full text-pill-text transition-colors
        ${isIconOnly ? "w-9 h-9" : "px-4 h-9"}
        ${isActive ? "bg-pill-hover" : ""}
        ${className}`}
    >
      {icon}
      {label && (
        <span className="font-medium text-sm whitespace-nowrap">{label}</span>
      )}
    </a>
  );
}

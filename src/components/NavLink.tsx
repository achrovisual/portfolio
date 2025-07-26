"use client";

import React, { useState } from "react";

interface NavLinkProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const inactiveStyle = {
    // backgroundColor: "var(--button-background)",
    color: "var(--button-text-subtitle)",
  };

  const activeStyle = {
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
  };

  const hoverStyle = {
    backgroundColor: "var(--button-background)",
    color: "var(--button-text-title)",
    cursor: "pointer",
  };

  const currentStyle = isActive
    ? activeStyle
    : isHovered
    ? hoverStyle
    : inactiveStyle;

  return (
    <button
      className={`min-w-[128px] px-6 h-[40px] flex rounded-full justify-center items-center focus:outline-none transition-colors duration-200 ease-in-out`}
      style={currentStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`uppercase font-semibold text-sm leading-none`}>
        {label}
      </span>
    </button>
  );
};

export default NavLink;

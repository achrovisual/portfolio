"use client";

import React from "react";

interface NavLinkProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, isActive, onClick }) => {
  const inactiveStyle = {
    backgroundColor: "var(--button-background)",
    color: "var(--button-text-subtitle)",
  };

  const activeStyle = {
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
  };

  return (
    <button
      className={`w-[128px] px-8 py-2 flex rounded-full justify-center focus:outline-none transition-colors duration-200 ease-in-out`}
      style={isActive ? activeStyle : inactiveStyle}
      onClick={onClick}
    >
      <span className={`capitalize font-medium text-md`}>{label}</span>
    </button>
  );
};

export default NavLink;

// components/FooterNavbar.tsx
import React from "react";
import NavLink from "./NavLink"; // Import the new NavLink component

interface FooterNavbarProps {
  className?: string;
  activePage: string;
  setActivePage: (page: string) => void;
}

const FooterNavbar: React.FC<FooterNavbarProps> = ({
  className,
  activePage,
  setActivePage,
}) => {
  return (
    <div className={`gap-2 ${className} flex justify-center py-4`}>
      <NavLink
        label="Photos"
        isActive={activePage === "photos"}
        onClick={() => setActivePage("photos")}
      />
      <NavLink
        label="Info"
        isActive={activePage === "info"}
        onClick={() => setActivePage("info")}
      />
      <NavLink
        label="Works"
        isActive={activePage === "works"}
        onClick={() => setActivePage("works")}
      />
    </div>
  );
};

export default FooterNavbar;

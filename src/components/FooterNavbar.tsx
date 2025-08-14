import React from "react";
import NavLink from "./NavLink";

interface FooterNavbarProps {
  className?: string;
  activePage: string;
  setActivePage: (page: string) => void;
  options?: Array<{ key: string; label: string }>;
}

const FooterNavbar: React.FC<FooterNavbarProps> = ({
  className,
  activePage,
  setActivePage,
  options = [
    { key: "photos", label: "Photos" },
    { key: "info", label: "Info" },
    { key: "works", label: "Works" },
    { key: "notes", label: "Notes" },
  ],
}) => {
  return (
    <div className={`gap-2 ${className} flex justify-center py-4`}>
      {options.map(({ key, label }) => (
        <NavLink
          key={key}
          label={label}
          isActive={activePage === key}
          onClick={() => setActivePage(key)}
        />
      ))}
    </div>
  );
};

export default FooterNavbar;

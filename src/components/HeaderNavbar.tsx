import React from "react";
import Button from "./Button";
interface HeaderNavbarProps {
  className?: string;
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({ className }) => {
  return (
    <div className={`p-4 flex justify-between ${className}`}>
      <Button
        title="Eugenio Pastoral"
        subtitle="DevOps Engineer & UI Designer"
        imageUrl="/avatar.png"
        defaultExpanded={true}
      />
      <div className="flex flex-row gap-2">
        <Button icon="mdi:github" href="https://github.com/achrovisual" />
        <Button
          icon="mdi:linkedin"
          href="https://www.linkedin.com/in/eugeniopastoral/"
        />
        <Button
          title="Not available for work"
          subtitle="But feel free to say hi"
          icon="ic:baseline-work-off"
          href="mailto:work@achrovisual.com"
        />
      </div>
    </div>
  );
};

export default HeaderNavbar;

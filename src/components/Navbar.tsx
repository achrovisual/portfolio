import React from "react";
import Button from "./Button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="p-4 flex justify-between">
      <Button
        title="Eugenio Pastoral"
        subtitle="DevOps Engineer & UI Designer"
        imageUrl="/avatar.png"
        defaultExpanded={true}
      />
      <div className="flex flex-row gap-2">
        <Button icon="mdi:instagram" />
        <Button icon="mdi:github" />
        <Button icon="mdi:linkedin" />
        <Button
          title="Not available for work"
          subtitle="But feel free to say hi"
          icon="ic:baseline-work-off"
        />
      </div>
    </div>
  );
};

export default Navbar;
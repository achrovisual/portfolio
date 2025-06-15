"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface ButtonProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
  alignment?: "left" | "center" | "right";
}

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  imageUrl,
  icon,
  iconSize = 28,
  iconColor = "currentColor",
  onClick,
  className = "",
  alignment = "left",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }
  let baseStyles =
    "flex flex-row items-center p-2 bg-stone-200/80 rounded-full transition-all duration-300 ease-out cursor-pointer";
  const textAlignClass = `text-${alignment}`;

  return (
    <div
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(imageUrl || icon) && (
        <div
          className="flex-shrink-0 w-12 h-12 aspect-square rounded-full bg-cover bg-center flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
          style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
        >
          {!imageUrl && icon && (
            <Icon
              icon={icon}
              width={iconSize}
              height={iconSize}
              color={iconColor}
              className="flex-shrink-0"
            />
          )}
        </div>
      )}

      {(title || subtitle) && (
        <div
          className={`
                flex flex-col justify-evenly min-w-0
                transition-all duration-300 ease-out
                ${
                  isHovered
                    ? "max-w-full opacity-100 px-4"
                    : "max-w-0 opacity-0 px-0"
                }
                ${textAlignClass}
                overflow-hidden
            `}
        >
          {title && (
            <span className="text-black text-md font-semibold whitespace-nowrap">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-gray-600 text-xs opacity-80 whitespace-nowrap">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Button;

// src/components/Button.tsx
import React from "react";
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
  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }
  let baseStyles =
    "flex flex-row items-center p-2 bg-stone-200/80 rounded-full";
  const textAlignClass = `text-${alignment}`;

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {(imageUrl || icon) && (
        <div
          className="flex-shrink-0 w-12 h-12 aspect-square rounded-full bg-cover bg-center flex items-center justify-center"
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
          className={`flex flex-col justify-evenly px-4 flex-grow min-w-0 ${textAlignClass}`}
        >
          {title && (
            <span className="text-black text-md font-semibold whitespace-nowrap">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-gray text-xs opacity-80 whitespace-nowrap">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Button;

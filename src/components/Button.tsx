"use client";

import React, { useState, useEffect, useRef } from "react";
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
  defaultExpanded?: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  imageUrl,
  icon,
  iconSize = 24,
  iconColor = "currentColor",
  onClick,
  className = "",
  alignment = "left",
  defaultExpanded = false,
  href,
}) => {
  const [isTextVisible, setIsTextVisible] = useState(defaultExpanded);

  const autoUnexpandTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoUnexpandTimeout = () => {
    if (autoUnexpandTimeoutRef.current) {
      clearTimeout(autoUnexpandTimeoutRef.current);
      autoUnexpandTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (defaultExpanded) {
      setIsTextVisible(true);
    }

    return () => {
      clearAutoUnexpandTimeout();
    };
  }, [defaultExpanded]);

  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }

  const baseClasses = [
    "flex",
    "flex-row",
    "items-center",
    "p-2",
    "rounded-full",
    "transition-all",
    "duration-300",
    "ease-out",
    "cursor-pointer",
    "backdrop-blur-sm",
    className,
  ].join(" ");

  const buttonStyle = {
    backgroundColor: "var(--button-background)",
  };

  const textAlignClass = `text-${alignment}`;

  const Tag = href ? "a" : "div";

  return (
    <Tag
      className={baseClasses}
      {...(href && { href, target: "_blank", rel: "noopener noreferrer" })}
      onClick={!href ? onClick : undefined}
      onMouseEnter={() => {
        if (!defaultExpanded) {
          setIsTextVisible(true);
          clearAutoUnexpandTimeout();
          autoUnexpandTimeoutRef.current = setTimeout(() => {
            setIsTextVisible(false);
          }, 5000);
        }
      }}
      onMouseLeave={() => {
        clearAutoUnexpandTimeout();
        if (!defaultExpanded) {
          setIsTextVisible(false);
        }
      }}
      style={buttonStyle}
    >
      {(imageUrl || icon) && (
        <div
          className="flex-shrink-0 w-10 h-10 aspect-square rounded-full bg-cover bg-center flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
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
                ${textAlignClass}
                overflow-hidden
                ${
                  isTextVisible
                    ? "max-w-full opacity-100 px-4"
                    : "max-w-0 opacity-0 px-0"
                }
            `}
        >
          {title && (
            <span
              className="text-md font-semibold whitespace-nowrap"
              style={{ color: "var(--button-text-title)" }}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span
              className="text-xs opacity-80 whitespace-nowrap"
              style={{ color: "var(--button-text-subtitle)" }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Tag>
  );
};

export default Button;

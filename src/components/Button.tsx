import React from "react";

interface ButtonProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  imageUrl,
  variant,
  onClick,
  className = "",
}) => {
  if (!title && !subtitle && !imageUrl) {
    return null;
  }

  let baseStyles =
    "flex flex-row items-center p-2 bg-stone-500/80 rounded-full";

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
      {imageUrl && (
        <div
          className="flex flex-shrink-0 w-12 h-12 aspect-square rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        ></div>
      )}
      {(title || subtitle) && (
        <div className="flex flex-col justify-evenly px-4 flex-grow min-w-0">
          {title && (
            <span className="text-white text-md font-semibold whitespace-nowrap">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-white text-xs opacity-80 whitespace-nowrap">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Button;

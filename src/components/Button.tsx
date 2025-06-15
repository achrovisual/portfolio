import React from 'react';
import { Icon } from '@iconify/react';

interface ButtonProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  icon?: string;
  iconSize?: number; 
  iconColor?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  imageUrl,
  icon,
  iconSize = 28,
  iconColor = 'currentColor',
  onClick,
  className = ''
}) => {
  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }

  let baseStyles = 'flex flex-row items-center p-2 bg-stone-500/80 rounded-full';

  return (
    <div className={`${baseStyles} ${className}`} onClick={onClick}>
        {(imageUrl || icon) && (
            <div
                className="flex-shrink-0 w-12 h-12 aspect-square rounded-full bg-cover bg-center bg-gray-200 flex items-center justify-center"
                style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
            >
                {!imageUrl && icon && (
                    <Icon icon={icon} width={iconSize} height={iconSize} color={iconColor} className="flex-shrink-0" />
                )}
            </div>
        )}
        {(title || subtitle) && (
            <div className="flex flex-col justify-evenly px-4 flex-grow min-w-0">
                {title && (
                    <span className="text-white text-md font-semibold whitespace-nowrap">{title}</span>
                )}
                {subtitle && (
                    <span className="text-white text-xs opacity-80 whitespace-nowrap">{subtitle}</span>
                )}
            </div>
        )}
    </div>
  );
};

export default Button;

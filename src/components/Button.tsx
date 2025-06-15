"use client"; // This directive marks the component as a Client Component, meaning it will be rendered on the client side.

import React, { useState } from "react"; // Imports React and the useState hook for managing component state.
import { Icon } from "@iconify/react"; // Imports the Icon component from the @iconify/react library for displaying icons.

// Defines the props interface for the Button component, specifying the types of all allowed properties.
interface ButtonProps {
  title?: string; // Optional title text to display on the button.
  subtitle?: string; // Optional subtitle text to display below the title.
  imageUrl?: string; // Optional URL for an image to display on the button.
  icon?: string; // Optional icon identifier from Iconify to display on the button.
  iconSize?: number; // Optional size for the icon (defaults to 28 if not provided).
  iconColor?: string; // Optional color for the icon (defaults to "currentColor" if not provided).
  variant?: "primary" | "secondary" | "danger"; // Optional predefined style variants for the button (currently unused in the component logic).
  onClick?: () => void; // Optional click handler function for the button.
  className?: string; // Optional additional CSS classes to apply to the button's container.
  alignment?: "left" | "center" | "right"; // Optional alignment for the text content (title/subtitle).
}

// Defines the Button functional component, accepting props conforming to the ButtonProps interface.
const Button: React.FC<ButtonProps> = ({
  title, // Destructures the title prop.
  subtitle, // Destructures the subtitle prop.
  imageUrl, // Destructures the imageUrl prop.
  icon, // Destructures the icon prop.
  iconSize = 28, // Destructures iconSize, providing a default value of 28.
  iconColor = "currentColor", // Destructures iconColor, providing a default value of "currentColor".
  onClick, // Destructures the onClick prop.
  className = "", // Destructures className, providing an empty string as a default.
  alignment = "left", // Destructures alignment, providing "left" as a default.
}) => {
  // Declares a state variable `isHovered` to track the hover state of the button, initialized to false.
  const [isHovered, setIsHovered] = useState(false);

  // If no title, subtitle, image, or icon is provided, the component renders nothing.
  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }

  // Defines base CSS styles that are applied to the button's main container.
  let baseStyles =
    "flex flex-row items-center p-2 bg-stone-200/80 rounded-full transition-all duration-300 ease-out cursor-pointer";
  // Determines the text alignment class based on the `alignment` prop.
  const textAlignClass = `text-${alignment}`;

  return (
    // The main container div for the button.
    <div
      className={`${baseStyles} ${className}`} // Combines base styles with any additional classes provided.
      onClick={onClick} // Attaches the onClick handler.
      onMouseEnter={() => setIsHovered(true)} // Sets isHovered to true when the mouse enters the button area.
      onMouseLeave={() => setIsHovered(false)} // Sets isHovered to false when the mouse leaves the button area.
    >
      {/* Conditionally renders the image or icon container if imageUrl or icon is provided. */}
      {(imageUrl || icon) && (
        <div
          className="flex-shrink-0 w-12 h-12 aspect-square rounded-full bg-cover bg-center flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
          // Sets the background image if imageUrl is provided.
          style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
        >
          {/* Conditionally renders the Icon component only if imageUrl is NOT provided but an icon IS provided. */}
          {!imageUrl && icon && (
            <Icon
              icon={icon} // Specifies the icon to display.
              width={iconSize} // Sets the width of the icon.
              height={iconSize} // Sets the height of the icon.
              color={iconColor} // Sets the color of the icon.
              className="flex-shrink-0" // Ensures the icon doesn't shrink.
            />
          )}
        </div>
      )}

      {/* Conditionally renders the title/subtitle container if title or subtitle is provided. */}
      {(title || subtitle) && (
        <div
          className={`
                flex flex-col justify-evenly min-w-0
                transition-all duration-300 ease-out
                ${
                  isHovered // Applies different width and opacity based on hover state for a "slide-in" effect.
                    ? "max-w-full opacity-100 px-4"
                    : "max-w-0 opacity-0 px-0"
                }
                ${textAlignClass} // Applies the text alignment class.
                overflow-hidden // Hides overflowing content during the transition.
            `}
        >
          {/* Conditionally renders the title span if title is provided. */}
          {title && (
            <span className="text-black text-md font-semibold whitespace-nowrap">
              {title}
            </span>
          )}
          {/* Conditionally renders the subtitle span if subtitle is provided. */}
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

export default Button; // Exports the Button component for use in other parts of the application.

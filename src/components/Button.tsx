"use client"; // This directive marks the component as a Client Component, meaning it will be rendered on the client side.

import React, { useState, useEffect, useRef } from "react"; // Imports React, the useState hook for managing component state, the useEffect hook for side effects, and useRef for mutable references.
import { Icon } from "@iconify/react"; // Imports the Icon component from the @iconify/react library for displaying various icons.

// Defines the shape of the props that the Button component can accept.
interface ButtonProps {
  title?: string; // Optional title text for the button.
  subtitle?: string; // Optional subtitle text for the button.
  imageUrl?: string; // Optional URL for an image to display on the button.
  icon?: string; // Optional string representing an icon from Iconify.
  iconSize?: number; // Optional size for the icon (defaults to 24 if not provided).
  iconColor?: string; // Optional color for the icon (defaults to "currentColor" if not provided).
  variant?: "primary" | "secondary" | "danger"; // Optional predefined visual variant for the button (e.g., for styling purposes).
  onClick?: () => void; // Optional click handler function for the button.
  className?: string; // Optional additional CSS classes to apply to the button.
  alignment?: "left" | "center" | "right"; // Optional alignment for the text content within the button.
  defaultExpanded?: boolean; // Optional boolean to determine if the text should be visible by default on mount.
  href?: string; // Optional URL to link to. If provided, the button will render as an <a> tag.
}

// Defines the Button functional component, destructuring its props.
const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  imageUrl,
  icon,
  iconSize = 24, // Default icon size if not provided.
  iconColor = "currentColor", // Default icon color if not provided.
  onClick,
  className = "", // Default empty string for className.
  alignment = "left", // Default alignment for text.
  defaultExpanded = false, // Default to not expanded.
  href, // Destructure href from props
}) => {
  // State variable to control the visibility of the title and subtitle text.
  const [isTextVisible, setIsTextVisible] = useState(defaultExpanded); // Initialize based on defaultExpanded

  // Ref to store the timeout ID for auto-unexpand.
  const autoUnexpandTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clears any active auto-unexpand timeout.
  const clearAutoUnexpandTimeout = () => {
    if (autoUnexpandTimeoutRef.current) {
      clearTimeout(autoUnexpandTimeoutRef.current);
      autoUnexpandTimeoutRef.current = null;
    }
  };

  // useEffect hook to handle initial expansion of text if defaultExpanded is true.
  // Also handles cleanup for timeouts.
  useEffect(() => {
    if (defaultExpanded) {
      setIsTextVisible(true);
    }

    // Cleanup function: clears any active timeout when the component unmounts.
    return () => {
      clearAutoUnexpandTimeout();
    };
  }, [defaultExpanded]); // Dependency array ensures this effect runs only when defaultExpanded changes.

  // If no content (title, subtitle, image, or icon) is provided, the component renders nothing.
  if (!title && !subtitle && !imageUrl && !icon) {
    return null;
  }

  // Defines an array of base CSS classes that are always applied to the button container.
  const baseClasses = [
    "flex", // Enables flexbox layout.
    "flex-row", // Arranges items in a row.
    "items-center", // Vertically centers items.
    "p-2", // Adds padding.
    "rounded-full", // Makes the button fully rounded.
    "transition-all", // Enables transitions for all animatable properties.
    "duration-300", // Sets transition duration to 300ms.
    "ease-out", // Sets ease-out timing function for transitions.
    "cursor-pointer", // Changes cursor to pointer on hover.
    "backdrop-blur-sm",
    className, // Includes any additional classes passed via props.
  ].join(" "); // Joins the array elements into a single string of classes.

  // Defines an inline style object for the button's background color, using a CSS variable.
  const buttonStyle = {
    backgroundColor: "var(--button-background)",
  };

  // Determines the text alignment class based on the 'alignment' prop.
  const textAlignClass = `text-${alignment}`;

  // Determine which element to render (div or a)
  const Tag = href ? "a" : "div";

  return (
    // The main container for the button, now conditionally rendering as 'a' or 'div'.
    <Tag
      className={baseClasses} // Applies the base CSS classes.
      // Apply href and target/rel props if Tag is 'a'
      {...(href && { href, target: "_blank", rel: "noopener noreferrer" })}
      // Only apply onClick if href is not provided. If href is provided, the browser handles navigation.
      onClick={!href ? onClick : undefined}
      onMouseEnter={() => {
        // Only show text and set timeout if not defaultExpanded
        if (!defaultExpanded) {
          setIsTextVisible(true);
          clearAutoUnexpandTimeout(); // Clear any previous timeout
          autoUnexpandTimeoutRef.current = setTimeout(() => {
            setIsTextVisible(false);
          }, 5000); // Auto-unexpand after 5 seconds
        }
      }}
      onMouseLeave={() => {
        // Clear the auto-unexpand timeout immediately on mouse leave
        clearAutoUnexpandTimeout();
        // If not defaultExpanded, hide text immediately on mouse leave
        if (!defaultExpanded) {
          setIsTextVisible(false);
        }
      }}
      style={buttonStyle} // Applies the background color style.
    >
      {(imageUrl || icon) && ( // Renders the image or icon section if either is provided.
        <div
          className="flex-shrink-0 w-10 h-10 aspect-square rounded-full bg-cover bg-center flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110" // Styling for the image/icon container.
          style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}} // Sets background image if imageUrl is provided.
        >
          {!imageUrl &&
            icon && ( // Renders the Icon component only if imageUrl is not present and an icon string is provided.
              <Icon
                icon={icon} // Specifies the icon to display.
                width={iconSize} // Sets the icon's width.
                height={iconSize} // Sets the icon's height.
                color={iconColor} // Sets the icon's color.
                className="flex-shrink-0" // Prevents the icon from shrinking.
              />
            )}
        </div>
      )}

      {(title || subtitle) && ( // Renders the text content section if title or subtitle is provided.
        <div
          className={`
                flex flex-col justify-evenly min-w-0 // Flex container for title/subtitle, allowing them to stack.
                transition-all duration-300 ease-out // Smooth transition for expansion/collapse.
                ${textAlignClass} // Applies the determined text alignment.
                overflow-hidden // Hides overflowing content during transition.
                ${
                  isTextVisible // Conditionally applies classes based on whether text should be visible.
                    ? "max-w-full opacity-100 px-4" // When visible: expands to full width, fully opaque, adds horizontal padding.
                    : "max-w-0 opacity-0 px-0" // When hidden: collapses width to 0, fully transparent, removes padding.
                }
            `}
        >
          {title && ( // Renders the title if provided.
            // Uses CSS variable for title color for theming flexibility.
            <span
              className="text-md font-semibold whitespace-nowrap" // Styling for the title text.
              style={{ color: "var(--button-text-title)" }} // Applies title text color from CSS variable.
            >
              {title}
            </span>
          )}
          {subtitle && ( // Renders the subtitle if provided.
            // Uses CSS variable for subtitle color for theming flexibility.
            <span
              className="text-xs opacity-80 whitespace-nowrap" // Styling for the subtitle text.
              style={{ color: "var(--button-text-subtitle)" }} // Applies subtitle text color from CSS variable.
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Tag>
  );
};

export default Button; // Exports the Button component for use in other parts of the application.
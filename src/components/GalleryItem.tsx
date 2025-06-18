"use client"; // This directive marks the component as a Client Component, meaning it will be rendered on the client side.

import React, { useState, useEffect } from "react"; // Imports React, the useState hook for managing component state, and the useEffect hook for side effects.
import Image from "next/image"; // Imports the Next.js Image component for optimized image handling.

// Defines the props interface for the GalleryItem component
interface GalleryItemProps {
  imageUrl: string; // URL of the image to display
  primaryInfo: { title: string; subtitle: string }; // Primary information (e.g., main title and subtitle)
  secondaryInfo: { title: string; subtitle: string }; // Secondary information (e.g., additional details)
  isActive: boolean; // Controls visibility and fade for the *entire item* in the slideshow.
}

// Defines the GalleryItem functional component, receiving props as defined above
const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  primaryInfo,
  secondaryInfo,
  isActive,
}) => {
  // State to control the visibility of the information block on hover
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    // Main container for each gallery item.
    // Absolute positioning and full width/height ensure it overlays correctly in a slideshow.
    // Opacity and z-index are transitioned based on the 'isActive' prop for smooth fading.
    <div
      className={`absolute inset-0 w-full h-full rounded-4xl overflow-hidden
                  transition-opacity duration-1000 ease-in-out
                  ${
                    isActive
                      ? "opacity-100 z-10" // Active state: fully visible, higher z-index
                      : "opacity-0 z-0 pointer-events-none" // Inactive state: hidden, lower z-index, no pointer events
                  }`}
      // Event handlers for showing/hiding the info block on mouse enter/leave
      onMouseEnter={() => setIsInfoVisible(true)}
      onMouseLeave={() => setIsInfoVisible(false)}
    >
      {/* Next.js Image component for optimized image display */}
      <Image
        src={imageUrl} // Source of the image
        alt={primaryInfo.title} // Alt text for accessibility
        fill // Fills the parent container
        style={{ objectFit: "cover" }} // Ensures the image covers the area without distortion
        className="rounded-4xl" // Applies border-radius
      />

      {/* Information block container */}
      {/* Positioned at the bottom-left, horizontally centered within its space */}
      {/* Applies a backdrop blur and transitions its opacity based on 'isInfoVisible' */}
      <div
        className={`absolute bottom-4 left-4 mx-auto w-fit z-20
                      flex flex-row justify-between items-center gap-8
                      px-6 py-4 rounded-3xl backdrop-blur-sm
                      transition-opacity duration-500 ${
                        isInfoVisible
                          ? "opacity-100" // Visible state
                          : "opacity-0 pointer-events-none" // Hidden state, no pointer events
                      }`}
        // Applies background color using a CSS variable for themeability
        style={{ backgroundColor: "var(--gallery-info-background)" }}
      >
        {/* Primary information section */}
        <div className="flex flex-col">
          <span
            className="text-md font-semibold whitespace-nowrap"
            // Applies text color using a CSS variable
            style={{ color: "var(--gallery-info-text-title)" }}
          >
            {primaryInfo.title} {/* Displays primary title */}
          </span>
          <span
            className="text-xs opacity-80 whitespace-nowrap"
            // Applies text color using a CSS variable
            style={{ color: "var(--gallery-info-text-subtitle)" }}
          >
            {primaryInfo.subtitle} {/* Displays primary subtitle */}
          </span>
        </div>

        {/* Secondary information section */}
        <div className="flex flex-col items-end min-w-[12rem]">
          <span
            className="text-md font-semibold whitespace-nowrap"
            // Applies text color using a CSS variable
            style={{ color: "var(--gallery-info-text-title)" }}
          >
            {secondaryInfo.title} {/* Displays secondary title */}
          </span>
          <span
            className="text-xs opacity-80 whitespace-nowrap"
            // Applies text color using a CSS variable
            style={{ color: "var(--gallery-info-text-subtitle)" }}
          >
            {secondaryInfo.subtitle} {/* Displays secondary subtitle */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem; // Exports the GalleryItem component for use in other parts of the application

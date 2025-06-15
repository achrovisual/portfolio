"use client"; // This directive marks the component as a Client Component, meaning it will be rendered on the client side.

import React, { useState } from "react"; // Imports React and the useState hook.

// Defines the props interface for the GalleryItem component, specifying the types of all allowed properties.
interface GalleryItemProps {
  imageUrl: string; // Required URL for the background image of the gallery item.
  // primaryInfo is an object containing a 'title' and a 'subtitle', representing the first set of information.
  primaryInfo: { title: string; subtitle: string; };
  // secondaryInfo is another object containing a 'title' and a 'subtitle', representing the second set of information.
  secondaryInfo: { title: string; subtitle: string; };
  onClick?: () => void; // Optional click handler function for the entire gallery item.
}

// Defines the GalleryItem functional component, accepting props conforming to the GalleryItemProps interface.
const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,      // Destructures the imageUrl prop.
  primaryInfo,   // Destructures the primaryInfo object prop.
  secondaryInfo, // Destructures the secondaryInfo object prop.
  onClick,       // Destructures the onClick prop.
}) => {
  // State to manage the visibility of the information block.
  // It's initialized to false (hidden).
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    // Main container div for the gallery item.
    // On mouse enter, set isInfoVisible to true to show the info block.
    // On mouse leave, set isInfoVisible to false to hide the info block.
    <div
      className="flex flex-grow flex-row p-4 bg-cover rounded-4xl items-end relative" // Added 'relative' for positioning if needed later, though not strictly for this fade effect.
      style={{ backgroundImage: `url('${imageUrl}')` }}
      onClick={onClick}
      onMouseEnter={() => setIsInfoVisible(true)}
      onMouseLeave={() => setIsInfoVisible(false)}
    >
      {/* Information block container. */}
      {/*
        Conditionally apply classes based on isInfoVisible state.
        'transition-opacity' enables a smooth transition for opacity changes.
        'duration-500' sets the transition duration to 500ms.
        'opacity-100' makes it fully visible when isInfoVisible is true.
        'opacity-0' makes it fully transparent (hidden) when isInfoVisible is false.
        'pointer-events-none' prevents interactions when hidden, though you might want to adjust this based on specific needs.
        'absolute inset-x-0 bottom-4 mx-4' is added for consistent positioning relative to the parent,
        adjust mx-4 as needed to match the padding of the parent for better visual alignment.
        Removed original flex properties from here as they are handled by parent.
      */}
      <div className={`flex flex-shrink flex-row justify-between gap-16 bg-stone-100/50 px-6 py-4 rounded-3xl backdrop-blur-sm
                      transition-opacity duration-500 ${isInfoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Primary Information section. */}
        <div className="flex flex-col">
          {/* Primary Info Title: Displays the title from primaryInfo. */}
          <span className="text-black text-md font-semibold whitespace-nowrap">{primaryInfo.title}</span>
          {/* Primary Info Subtitle: Displays the subtitle from primaryInfo. */}
          <span className="text-gray-600 text-xs opacity-80 whitespace-nowrap">{primaryInfo.subtitle}</span>
        </div>

        {/* Secondary Information section. */}
        <div className="flex flex-col items-end">
          {/* Secondary Info Title: Displays the title from secondaryInfo. */}
          <span className="text-black text-md font-semibold whitespace-nowrap">{secondaryInfo.title}</span>
          {/* Secondary Info Subtitle: Displays the subtitle from secondaryInfo. */}
          <span className="text-gray-600 text-xs opacity-80 whitespace-nowrap">{secondaryInfo.subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem; // Exports the GalleryItem component for use in other parts of the application.
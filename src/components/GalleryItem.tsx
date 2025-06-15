import React from "react"; // Imports the React library.

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
  return (
    // Main container div for the gallery item.
    <div
      className="flex flex-grow flex-row p-4 bg-cover rounded-4xl items-end"
      style={{ backgroundImage: `url('${imageUrl}')` }}
      onClick={onClick}
    >
      {/* Information block container. */}
      <div className="flex flex-shrink flex-row justify-between gap-16 bg-stone-100/50 px-6 py-4 rounded-3xl backdrop-blur-sm">
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

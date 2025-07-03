// This is a Client Component, necessary for Hooks like useState and useEffect.
"use client";

import React, { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";

// Define the structure for a single gallery item object.
// This interface helps ensure type safety when passing data.
interface GalleryItemData {
  id: number;
  imageUrl: string;
  primaryInfo: { title: string; subtitle: string };
  secondaryInfo: { title: string; subtitle: string };
}

// Update the GalleryProps interface to include 'galleryItemsData'.
interface GalleryProps {
  galleryItemsData: GalleryItemData[]; // Array of gallery item data.
}

// Defines the Gallery functional component, now accepting 'galleryItemsData' as a prop.
const Gallery: React.FC<GalleryProps> = ({ galleryItemsData }) => {
  // State to track the currently active image index.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect to manage the automatic slideshow transition.
  useEffect(() => {
    // Set an interval to change the image every 5 seconds.
    const interval = setInterval(() => {
      // Ensure there are items to prevent division by zero if the array is empty.
      if (galleryItemsData.length === 0) return;
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % galleryItemsData.length
      );
    }, 5000);

    // Clean up the interval on component unmount or if dependencies change.
    return () => clearInterval(interval);
  }, [galleryItemsData.length]); // Dependency array: Effect re-runs if the number of items changes.

  return (
    // Outer container: Defines gallery area and applies padding.
    <div className="flex flex-col w-full h-full px-4 pb-4">
      {/* Inner container: Acts as the relative positioning context for GalleryItems. */}
      <div className="relative flex-grow w-full h-full overflow-hidden rounded-4xl">
        {/* Map over data to render each GalleryItem.
            Only render if galleryItemsData is not empty to prevent errors. */}
        {galleryItemsData.length > 0 ? (
          galleryItemsData.map((item, index) => (
            <GalleryItem
              key={item.id} // Unique key for list rendering.
              imageUrl={item.imageUrl}
              primaryInfo={item.primaryInfo}
              secondaryInfo={item.secondaryInfo}
              isActive={index === currentImageIndex} // Pass active state for fade.
            />
          ))
        ) : (
          // Display a message if there are no gallery items.
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
            No images to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

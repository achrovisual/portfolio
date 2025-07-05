"use client";

import React, { useState, useEffect } from "react";
import GalleryItem from "./GalleryItem";

interface GalleryItemData {
  id: number;
  imageUrl: string;
  primaryInfo: { title: string; subtitle: string };
  secondaryInfo: { title: string; subtitle: string };
}

interface GalleryProps {
  galleryItemsData: GalleryItemData[];
}

const Gallery: React.FC<GalleryProps> = ({ galleryItemsData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (galleryItemsData.length === 0) return;
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % galleryItemsData.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryItemsData.length]);

  return (
    <div className="flex flex-col w-full px-4 pb-4">
      <div className="relative w-full overflow-hidden rounded-4xl aspect-16/10 md:aspect-w-16 md:aspect-h-10">
        {galleryItemsData.length > 0 ? (
          galleryItemsData.map((item, index) => (
            <GalleryItem
              key={item.id}
              imageUrl={item.imageUrl}
              primaryInfo={item.primaryInfo}
              secondaryInfo={item.secondaryInfo}
              isActive={index === currentImageIndex}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
            No images to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

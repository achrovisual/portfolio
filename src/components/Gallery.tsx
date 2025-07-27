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
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ galleryItemsData, className }) => {
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
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {galleryItemsData.length > 0 ? (
        <div
          className="relative overflow-hidden rounded-4xl w-full h-full"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            aspectRatio: "16 / 10",
            flexShrink: 0,
          }}
        >
          {galleryItemsData.map((item, index) => (
            <GalleryItem
              key={item.id}
              imageUrl={item.imageUrl}
              primaryInfo={item.primaryInfo}
              secondaryInfo={item.secondaryInfo}
              isActive={index === currentImageIndex}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-neutral-500 w-full h-full">
          No images to display.
        </div>
      )}
    </div>
  );
};

export default Gallery;

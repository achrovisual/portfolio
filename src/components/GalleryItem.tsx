// This is a Client Component.
"use client";

import React from "react";
import Image from "next/image";

interface GalleryItemProps {
  imageUrl: string;
  primaryInfo: { title: string; subtitle: string };
  secondaryInfo: { title: string; subtitle: string };
  isActive: boolean; // Controls visibility and fade.
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  primaryInfo,
  secondaryInfo,
  isActive,
}) => {
  return (
    // Main container for each gallery item.
    // Positions itself absolutely to fill its parent and handle fade based on 'isActive'.
    <div
      className={`absolute inset-0 w-full h-full rounded-4xl overflow-hidden
                  transition-opacity duration-1000 ease-in-out
                  ${
                    isActive
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
    >
      {/* Next.js Image component for optimized image display. */}
      <Image
        src={imageUrl}
        alt={primaryInfo.title}
        layout="fill"
        objectFit="cover"
        className="rounded-4xl"
      />

      {/* Information block container, positioned at the bottom. */}
      <div
        className="absolute bottom-4 left-4 mx-auto w-fit z-20
                      flex flex-row justify-between items-center gap-8
                      bg-stone-100/50 px-6 py-4 rounded-3xl backdrop-blur-sm"
      >
        {/* Primary info: title and subtitle. */}
        <div className="flex flex-col">
          <span className="text-black text-md font-semibold whitespace-nowrap">
            {primaryInfo.title}
          </span>
          <span className="text-gray-600 text-xs opacity-80 whitespace-nowrap">
            {primaryInfo.subtitle}
          </span>
        </div>

        {/* Secondary info: title and subtitle. */}
        <div className="flex flex-col items-end">
          <span className="text-black text-md font-semibold whitespace-nowrap">
            {secondaryInfo.title}
          </span>
          <span className="text-gray-600 text-xs opacity-80 whitespace-nowrap">
            {secondaryInfo.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;

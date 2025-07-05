"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryItemProps {
  imageUrl: string;
  primaryInfo: { title: string; subtitle: string };
  secondaryInfo: { title: string; subtitle: string };
  isActive: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  imageUrl,
  primaryInfo,
  secondaryInfo,
  isActive,
}) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-4xl overflow-hidden
                  transition-opacity duration-1000 ease-in-out
                  ${
                    isActive
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
      onMouseEnter={() => setIsInfoVisible(true)}
      onMouseLeave={() => setIsInfoVisible(false)}
    >
      <Image
        src={imageUrl}
        alt={primaryInfo.title}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-4xl"
      />

      <div
        className={`absolute bottom-4 left-4 mx-auto w-fit z-20
                      flex flex-row justify-between items-center gap-8
                      px-6 py-4 rounded-3xl backdrop-blur-sm
                      transition-opacity duration-500 ${
                        isInfoVisible
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
        style={{ backgroundColor: "var(--gallery-info-background)" }}
      >
        <div className="flex flex-col">
          <span
            className="text-md font-semibold whitespace-nowrap"
            style={{ color: "var(--gallery-info-text-title)" }}
          >
            {primaryInfo.title}
          </span>
          <span
            className="text-xs opacity-80 whitespace-nowrap"
            style={{ color: "var(--gallery-info-text-subtitle)" }}
          >
            {primaryInfo.subtitle}
          </span>
        </div>

        <div className="flex flex-col items-end min-w-[12rem]">
          <span
            className="text-md font-semibold whitespace-nowrap"
            style={{ color: "var(--gallery-info-text-title)" }}
          >
            {secondaryInfo.title}
          </span>
          <span
            className="text-xs opacity-80 whitespace-nowrap"
            style={{ color: "var(--gallery-info-text-subtitle)" }}
          >
            {secondaryInfo.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;

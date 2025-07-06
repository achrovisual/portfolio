"use client";

import React from "react";
import Button from "./Button";

interface ScrollerItem {
  title: string;
  icon?: string;
  imageUrl?: string;
}

interface ContentScrollerProps {
  items: ScrollerItem[];
  mainTitle: string;
  mainSubtitle: string;
  tags: string[];
  itemAnimationDuration?: string;
  tagAnimationDuration?: string;
  itemAnimationDirection?: "left" | "right";
  tagAnimationDirection?: "left" | "right";
}

const ContentScroller: React.FC<ContentScrollerProps> = ({
  items,
  mainTitle,
  mainSubtitle,
  tags,
  itemAnimationDuration = "30s",
  tagAnimationDuration = "30s",
  itemAnimationDirection = "left",
  tagAnimationDirection = "right",
}) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  const duplicatedTags = [...tags, ...tags, ...tags, ...tags];

  const itemAnimationClass =
    itemAnimationDirection === "left"
      ? "animate-scroll-left"
      : "animate-scroll-right";
  const tagAnimationClass =
    tagAnimationDirection === "left"
      ? "animate-scroll-left"
      : "animate-scroll-right";

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="relative w-full overflow-hidden mb-6 py-2">
        <div
          className={`flex flex-nowrap justify-start gap-4 ${itemAnimationClass}`}
          style={{ animationDuration: itemAnimationDuration }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "running";
          }}
        >
          {duplicatedItems.map((item, index) => (
            <Button
              key={index}
              title={item.title}
              icon={item.icon}
              imageUrl={item.imageUrl}
              iconSize={24}
              className="flex-shrink-0 !p-1 !rounded-full !bg-neutral-200 dark:!bg-neutral-700 hover:!bg-neutral-300 dark:hover:!bg-neutral-600 transition-colors duration-200"
              iconColor="var(--button-text-title)"
              defaultExpanded={false}
              style={
                {
                  "--button-background":
                    "var(--tw-bg-opacity, 1) var(--tw-bg-neutral-200)",
                  "--button-text-title": "currentColor",
                  "--button-text-subtitle": "currentColor",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {mainTitle}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-base">
          {mainSubtitle}
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div
          className={`flex flex-nowrap justify-start gap-2 ${tagAnimationClass}`}
          style={{ animationDuration: tagAnimationDuration }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "running";
          }}
        >
          {duplicatedTags.map((tag, index) => (
            <span
              key={index}
              className="flex-shrink-0 px-3 py-1 rounded-full text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentScroller;

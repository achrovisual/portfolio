"use client";

import React, { useState } from "react";
import FooterNavbar from "./FooterNavbar";
import Gallery from "./Gallery";
import GitFeed from "./GitFeed";
import ContentScroller from "./ContentScroller";
import Notes from "./Notes";
import HeaderNavbar from "./HeaderNavbar";

import { DailyActivity } from "../api/github/route";

import { GalleryItem } from "../types/gallery";
import { Note } from "../types/note";
import { ScrollerItem } from "../types/scroller";

interface DynamicPageContentProps {
  galleryItemsData: GalleryItem[];
  errorFetchingGalleryData: boolean;
  gitActivityData: DailyActivity[];
  errorFetchingGitActivity: boolean;
  skillsData: ScrollerItem[];
  skillTags: string[];
  notesData: Note[];
}

const DynamicPageContent: React.FC<DynamicPageContentProps> = ({
  galleryItemsData,
  errorFetchingGalleryData,
  gitActivityData,
  errorFetchingGitActivity,
  skillsData,
  skillTags,
  notesData,
}) => {
  const [activePage, setActivePage] = useState("photos");

  const renderContent = () => {
    switch (activePage) {
      case "photos":
        return (
          <div className="flex flex-col w-full h-full items-center justify-center">
            {errorFetchingGalleryData ? (
              <p className="text-center text-red-500 mt-8">
                Failed to load gallery images. Please try again later.
              </p>
            ) : galleryItemsData.length > 0 ? (
              <Gallery
                galleryItemsData={galleryItemsData}
                className="w-full h-full"
              />
            ) : (
              <p className="text-center text-neutral-500 mt-8">
                No gallery items found.
              </p>
            )}
          </div>
        );
      case "info":
        return (
          <div className="mx-auto px-4 pb-4 flex flex-col w-full flex-shrink-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full flex-grow overflow-hidden grid-rows-[1fr]">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col overflow-y-auto h-[300px] min-h-0">
                {errorFetchingGitActivity ? (
                  <div className="flex items-center justify-center h-full text-red-500 dark:text-red-400">
                    <p className="text-lg text-center">
                      Error loading GitHub activity. Please try again later.
                    </p>
                  </div>
                ) : (
                  <GitFeed activityData={gitActivityData} />
                )}
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col items-center justify-center overflow-hidden h-[300px] min-h-0">
                <ContentScroller
                  items={skillsData}
                  mainTitle="Skills & Stack Mastery"
                  mainSubtitle="No tech stack is a stranger – I jump in and deliver."
                  tags={skillTags}
                  itemAnimationDuration="90s"
                  tagAnimationDuration="90s"
                  itemAnimationDirection="left"
                  tagAnimationDirection="right"
                  pauseOnHover={false}
                />
              </div>
            </div>
          </div>
        );
      case "works":
        return (
          <div className="flex flex-col items-center justify-center flex-grow">
            <p className="text-2xl font-bold">Works content coming soon!</p>
          </div>
        );
      case "notes":
        return (
          <div className="flex flex-col w-full flex-grow">
            <Notes notesData={notesData} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full text-neutral-900 dark:text-neutral-100">
      <HeaderNavbar className="absolute top-0 left-0 w-full z-10" />
      <div className="absolute inset-0 overflow-y-auto pt-[5.5rem] pb-[5rem]">
        {renderContent()}
      </div>
      <FooterNavbar
        activePage={activePage}
        setActivePage={setActivePage}
        className="absolute bottom-0 w-full z-10"
      />
    </div>
  );
};

export default DynamicPageContent;

import { Metadata } from "next";
import Gallery from "../components/Gallery";
import { fetchGalleryData, GalleryItem } from "../api/gallery";
import GitFeed from "../components/GitFeed";

import { fetchGitHubActivity, DailyActivity } from "../api/github";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

export default async function Home() {
  let myGalleryData: GalleryItem[] = [];
  let errorFetchingGalleryData: boolean = false;

  let gitActivityData: DailyActivity[] = [];
  let errorFetchingGitActivity: boolean = false;

  try {
    myGalleryData = await fetchGalleryData();
  } catch (error) {
    console.error("Failed to load gallery data in Home component:", error);
    errorFetchingGalleryData = true;
  }

  try {
    gitActivityData = await fetchGitHubActivity();
  } catch (error) {
    console.error(
      "Failed to load GitHub activity data in Home component:",
      error
    );
    errorFetchingGitActivity = true;
  }

  return (
    <div className="flex flex-grow flex-col text-neutral-900 dark:text-neutral-100 min-h-0">
      <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-5.5rem)]">
        {errorFetchingGalleryData ? (
          <p className="text-center text-red-500 mt-8">
            Failed to load gallery images. Please try again later.
          </p>
        ) : myGalleryData.length > 0 ? (
          <Gallery galleryItemsData={myGalleryData} />
        ) : (
          <p className="text-center text-neutral-500 mt-8">
            No gallery items found.
          </p>
        )}
      </div>
      <div className="mx-auto px-4 pb-4 h-[300px] flex flex-col w-full flex-shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full flex-grow overflow-hidden grid-rows-[1fr]">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col overflow-y-auto h-full min-h-0">
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
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-4xl shadow-md flex flex-col items-center justify-center overflow-y-auto h-full min-h-0">
            <p className="text-neutral-600 dark:text-neutral-400 text-center">
              placeholder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

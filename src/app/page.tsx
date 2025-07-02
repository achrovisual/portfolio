import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

import Gallery from "../components/Gallery";
import { fetchGalleryData, GalleryItem } from "../api/gallery";
import GitFeed from "../components/GitFeed";

export default async function Home() {
  let myGalleryData: GalleryItem[] = [];
  let errorFetchingData: boolean = false;

  try {
    myGalleryData = await fetchGalleryData();
  } catch (error) {
    console.error("Failed to load gallery data in Home component:", error);
    errorFetchingData = true;
  }

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-grow flex-col min-h-screen items-center justify-center">
        {errorFetchingData ? (
          <p className="text-center text-red-500 mt-8">
            Failed to load gallery images. Please try again later.
          </p>
        ) : myGalleryData.length > 0 ? (
          <Gallery galleryItemsData={myGalleryData} />
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No gallery items found.
          </p>
        )}
      </div>
      <div className="mx-auto px-4 pb-4 flex-grow-0 h-[300px] flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-hidden">
          <div className="bg-white p-6 rounded-4xl shadow-md flex flex-col items-center justify-center overflow-y-auto">
            <GitFeed />
          </div>
          <div className="bg-white p-6 rounded-4xl shadow-md flex flex-col items-center justify-center overflow-y-auto">
            <p className="text-gray-600 text-center">placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

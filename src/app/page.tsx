import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

import Gallery from "../components/Gallery";
import { fetchGalleryData, GalleryItem } from "../api/gallery";

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
  );
}
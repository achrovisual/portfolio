import { NextResponse } from "next/server";
import { headers } from "next/headers";
import logger from "@/lib/logger";

export interface GalleryItem {
  id: number;
  imageUrl: string;
  primaryInfo: {
    title: string;
    subtitle: string;
  };
  secondaryInfo: {
    title: string;
    subtitle: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USE_MOCK_DATA = true;
const MOCK_DATA_DELAY = 500;

const mockGalleryData: GalleryItem[] = [
  {
    id: 1,
    imageUrl: "/images/001.jpg",
    primaryInfo: {
      title: "Canon EOS 7D",
      subtitle: "Digital",
    },
    secondaryInfo: { title: "Batangas, Philippines", subtitle: "2018" },
  },
  {
    id: 2,
    imageUrl: "/images/002.jpg",
    primaryInfo: {
      title: "Canon EOS 7D",
      subtitle: "Digital",
    },
    secondaryInfo: { title: "Batangas, Philippines", subtitle: "2018" },
  },
  {
    id: 3,
    imageUrl: "/images/003.jpg",
    primaryInfo: {
      title: "Canon EOS 7D",
      subtitle: "Digital",
    },
    secondaryInfo: { title: "Batangas, Philippines", subtitle: "2019" },
  },
];

export async function fetchGalleryData(
  correlationId: string = "N/A"
): Promise<GalleryItem[]> {
  const galleryLogger = logger.child({
    correlationId,
    module: "GalleryFetcher",
  });

  if (USE_MOCK_DATA) {
    galleryLogger.info("Using mock gallery data.", { delay: MOCK_DATA_DELAY });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGalleryData);
      }, MOCK_DATA_DELAY);
    });
  }

  if (!API_BASE_URL) {
    galleryLogger.error(
      "API_BASE_URL environment variable is missing for real API fetch."
    );
    throw new Error("API_BASE_URL environment variable is missing.");
  }

  try {
    galleryLogger.info("Attempting to fetch gallery data from real API.", {
      url: `${API_BASE_URL}/gallery`,
    });
    const response = await fetch(`${API_BASE_URL}/gallery`);

    if (!response.ok) {
      const errorData = await response.json();
      galleryLogger.error(
        `Failed to fetch gallery data from API: ${response.status} ${response.statusText}`,
        {
          status: response.status,
          statusText: response.statusText,
          responseMessage: errorData.message || "Unknown error",
          url: `${API_BASE_URL}/gallery`,
        }
      );
      throw new Error(
        `Failed to fetch gallery data: ${response.status} ${
          response.statusText
        } - ${errorData.message || "Unknown error"}`
      );
    }
    const data: GalleryItem[] = await response.json();
    galleryLogger.info("Gallery data fetched successfully from API.", {
      itemCount: data.length,
    });
    return data;
  } catch (error: any) {
    galleryLogger.error("Error fetching gallery data from API:", {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

export async function GET(request: Request) {
  const requestHeaders = headers();
  const correlationId = requestHeaders.get("x-correlation-id") || "N/A";
  const apiRouteLogger = logger.child({ correlationId, apiRoute: "Gallery" });

  apiRouteLogger.info("Gallery API route accessed");

  try {
    const galleryData = await fetchGalleryData(correlationId);
    return NextResponse.json(galleryData);
  } catch (error: any) {
    apiRouteLogger.error("Failed to fetch gallery data for API route", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to retrieve gallery data", details: error.message },
      { status: 500 }
    );
  }
}

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
const USE_MOCK_DATA = true; // Set to 'true' to use mock data, 'false' for the real API
const MOCK_DATA_DELAY = 500; // Simulate network latency with a delay in milliseconds

const mockGalleryData: GalleryItem[] = [
  {
    id: 1,
    imageUrl: "/images/000025940032.jpg",
    primaryInfo: {
      title: "Yashica Electro 35 GTN",
      subtitle: "Kodak ColorPlus 200",
    },
    secondaryInfo: { title: "Iloilo, Philippines", subtitle: "2024" },
  },
  {
    id: 2,
    imageUrl: "/images/000025940033.jpg",
    primaryInfo: {
      title: "Yashica Electro 35 GTN",
      subtitle: "Kodak ColorPlus 200",
    },
    secondaryInfo: { title: "Iloilo, Philippines", subtitle: "2024" },
  },
];

export async function fetchGalleryData(): Promise<GalleryItem[]> {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Using mock gallery data.");
        resolve(mockGalleryData);
      }, MOCK_DATA_DELAY);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch gallery data: ${response.status} ${
          response.statusText
        } - ${errorData.message || "Unknown error"}`
      );
    }
    const data: GalleryItem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching gallery data from API:", error);
    throw error;
  }
}

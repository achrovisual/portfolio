import Image from "next/image";
import Gallery from "../components/Gallery";

export default function Home() {
  const myGalleryData = [
    {
      id: 1,
      imageUrl: "/images/000025940020.jpg",
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

  return (
    <div className="flex flex-grow flex-col">
      {/* Pass the gallery data as a prop to the Gallery component */}
      <Gallery galleryItemsData={myGalleryData} />
    </div>
  );
}

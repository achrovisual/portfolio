export interface GalleryItem {
  id: number;
  imageUrl: string;
  primaryInfo: { title: string; subtitle: string };
  secondaryInfo: { title: string; subtitle: string };
}

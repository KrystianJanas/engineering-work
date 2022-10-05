export interface AnnouncementsProps {
  data?: Announcement[];
  onSubmit?: (params: Announcement) => void;
}

export interface Announcement {
  id: number;
  title: string;
  location: string;
  size: string;
  price: string;
  imageUrl?: string;
}

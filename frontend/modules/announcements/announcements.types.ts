export interface AnnouncementsProps {
  data?: Announcement[];
  onSubmit?: (params: Announcement) => void;
}

export interface Announcement {
  id: number; // id
  title: string; // tytul
  description?: string;
  location: string; // lokalizacja
  state: string; // stan deweloperski/umeblowane
  size: number; // metraż// czynsz
  fee: number; // odstępne
  rent: number;
  imageUrl?: string; // avatar zdjecia
  date_add?: string; // data dodania
  rooms: number; // liczba pokoi
  views?: number; // todo

  advertiser?: {
    name: string;
    phone: number;
  };

  person: { _id: number; name: string };
  images: [];
}

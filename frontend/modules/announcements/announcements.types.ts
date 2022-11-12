export interface AnnouncementsProps {
  data?: Announcement[];
  onSubmit?: (params: Announcement) => void;
}

export interface Announcement {
  id: number; // id
  title: string; // tytul
  location: string; // lokalizacja
  state: string; // stan deweloperski/umeblowane
  size: number; // metraż
  fee: number; // odstępne
  rent: number; // czynsz
  imageUrl?: string; // avatar zdjecia
  date_add: string; // data dodania
  rooms: number; // liczba pokoi
  description?: string;
  views?: number;

  advertiser?: {
    name: string;
    phone: number;
  };
}
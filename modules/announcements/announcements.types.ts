export interface AnnouncementsProps {
  data?: Announcement[];
  onSubmit?: (params: Announcement) => void;
}

export interface Announcement {
  id: number; // id
  title: string; // tytul
  location: string; // lokalizacja
  state: string; // stan deweloperski/umeblowane
  size: string; // metraż
  price: string; // cena (odstepne)
  imageUrl?: string; // avatar
  date_add: string; // data dodania
}

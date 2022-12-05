export interface AnnouncementsModel {
  _id: string;
  person: string;
  title: string;
  description: string;
  location: string;
  state: string;
  size: number;
  rooms: number;
  fee: number;
  rent: number;
  images: string[];
  views: number;
  created_at: string;
  updated_at: string;
}

import { PersonLoginIdModel } from '~/models/person.model';

export interface AnnouncementModel {
  _id: string;
  person: PersonLoginIdModel;
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

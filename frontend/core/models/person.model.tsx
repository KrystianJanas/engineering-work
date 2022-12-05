import { PersonLoginIdModel } from '~/models/people.model';

export interface PersonModel {
  _id: string;
  name: string;
  city: string;
  zip_code: string;
  phone_number: number;
  avatar_url: string;
  user: PersonLoginIdModel;
  created_at: string;
  updated_at: string;
}

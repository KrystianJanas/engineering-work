export interface PeopleModel {
  _id: string;
  name: string;
  city: string;
  zip_code: string;
  phone_number: number;
  avatar_url: string;
  user: string;
  created_at: string;
  updated_at: string;
}

export interface PersonLoginIdModel {
  _id: string;
  login: string;
}

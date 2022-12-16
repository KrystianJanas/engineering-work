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

export interface PersonLoginIdModel {
  _id: string;
  name: string;
  phone_number: number;
}

export interface PersonConversationsModel {
  name: string;
}

// -------- INITIAL STATES

export const PersonLoginIdModelInitialState: PersonLoginIdModel = {
  _id: '',
  name: '',
  phone_number: 0,
};

export const PersonConversationsModelInitialState: PersonConversationsModel = {
  name: '',
};

export const PersonModelInitialState: PersonModel = {
  _id: '',
  name: '',
  city: '',
  zip_code: '',
  phone_number: 0,
  avatar_url: '',
  user: PersonLoginIdModelInitialState,
  created_at: '',
  updated_at: '',
};

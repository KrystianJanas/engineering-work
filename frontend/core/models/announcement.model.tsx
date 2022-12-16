import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
} from '~/models/person.model';

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

export interface AnnouncementConversationsModel {
  _id: string;
  title: string;
  images: string[];
}

export interface AnnouncementTitleModel {
  title: string;
}

// ------- INITIAL STATES

export const AnnouncementConversationsModelInitialState: AnnouncementConversationsModel =
  {
    _id: '',
    title: '',
    images: [],
  };

export const AnnouncementModelInitialState: AnnouncementModel = {
  _id: '',
  person: PersonLoginIdModelInitialState,
  title: '',
  description: '',
  location: '',
  state: '',
  size: 0,
  rooms: 0,
  fee: 0,
  rent: 0,
  images: [],
  views: 0,
  created_at: '',
  updated_at: '',
};

export const AnnouncementTitleModelInitialState = {
  title: '',
};

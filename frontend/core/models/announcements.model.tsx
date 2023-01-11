import {
  MetaTypes,
  MetaTypesInitialState,
} from '~/hooks/usePagination/metaTypes';

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
  views?: number;
  created_at?: string;
  updated_at?: string;

  status?: boolean;
}

// export const AnnouncementsModelInitialState: AnnouncementsModel = {
//   _id: '',
//   person: '',
//   title: '',
//   description: '',
//   location: '',
//   state: '',
//   size: 0,
//   rooms: 0,
//   fee: 0,
//   rent: 0,
//   images: [],
//   views: 0,
//   created_at: '',
//   updated_at: '',
//
//   status: false,
// };

export const AnnouncementsModelInitialState: AnnouncementsModel = {
  _id: '58723523635',
  person: '32526262346246',
  title: 'Testowy tytuł ogłoszenia',
  description: 'Testowy opis dla tego ogłoszenia',
  location: 'Rzeszów',
  state: 'Nieruchomość nieumeblowana',
  size: 50,
  rooms: 3,
  fee: 300,
  rent: 250,
  images: [],
  views: 150,
  created_at: '',
  updated_at: '',

  status: false,
};

export interface AnnouncementsModelData {
  announcements: AnnouncementsModel[];
  meta: MetaTypes;
}

export const AnnouncementsModelDataInitialState: AnnouncementsModelData = {
  announcements: [AnnouncementsModelInitialState],
  meta: MetaTypesInitialState,
};

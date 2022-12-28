import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
  PersonModel,
} from '~/models/person.model';

export interface EstateModel {
  _id: string;
  person: PersonLoginIdModel;
  title: string;
  info: string;
  location: string;
  state: string;
  size: number;
  rooms: number;
  fee: number;
  caution: number;
  rent: number;
  images: string[];

  renter: PersonModel[];

  views?: number;
  created_at?: string;
  updated_at?: string;

  status?: boolean;
}

export const EstatesModelInitialState: EstateModel = {
  _id: '',
  person: PersonLoginIdModelInitialState,
  title: '',
  info: '',
  location: '',
  state: '',
  size: 0,
  rooms: 0,
  fee: 0,
  caution: 0,
  rent: 0,
  images: [],

  renter: [],

  views: 0,
  created_at: '',
  updated_at: '',

  status: false,
};

export interface ManagementEstateForm {
  estate?: EstateModel;
  onSubmit?: (data: EstateModel) => void;
}

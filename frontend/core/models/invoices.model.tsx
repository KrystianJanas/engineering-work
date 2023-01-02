import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
} from '~/models/person.model';

export interface InvoicesModel {
  _id: string;

  person: string;
  estate: string;

  renters: [PersonLoginIdModel];
  paid_renters: [PersonLoginIdModel];

  invoice_name: string;
  description: string;

  created_at: string;
  updated_at: string;

  status?: string;
}

export const InvoicesModelInitialState: InvoicesModel = {
  _id: '',

  person: '',
  estate: '',

  renters: [PersonLoginIdModelInitialState],
  paid_renters: [PersonLoginIdModelInitialState],

  invoice_name: '',
  description: '',

  created_at: '',
  updated_at: '',
};

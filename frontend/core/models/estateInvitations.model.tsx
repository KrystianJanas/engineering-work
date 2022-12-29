import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
} from '~/models/person.model';

export interface EstateInvitationsModel {
  _id: string;
  estate: EstateModel;
  person: PersonLoginIdModel;
}

export const EstateInvitationsModelInitialState = {
  _id: '',
  estate: EstatesModelInitialState,
  person: PersonLoginIdModelInitialState,
};

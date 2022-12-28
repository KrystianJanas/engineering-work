import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
} from '~/models/person.model';

export interface EstateInvitationsModel {
  estate: EstateModel;
  person: PersonLoginIdModel;
}

export const EstateInvitationsModelInitialState = {
  estate: EstatesModelInitialState,
  person: PersonLoginIdModelInitialState,
};

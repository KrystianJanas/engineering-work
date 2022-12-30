import {
  PersonConversationsModel,
  PersonConversationsModelInitialState,
} from '~/models/person.model';

export interface EstateMessagesModel {
  _id: string;
  person: PersonConversationsModel;
  estate: string;
  content: string;

  created_at: string;
}

export const EstateMessagesModelInitialState = {
  _id: '',
  person: PersonConversationsModelInitialState,
  estate: '',
  content: '',

  created_at: '',
};

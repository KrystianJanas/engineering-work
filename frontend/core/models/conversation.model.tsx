import {
  MetaTypes,
  MetaTypesInitialState,
} from '~/hooks/usePagination/metaTypes';
import {
  AnnouncementConversationsModel,
  AnnouncementConversationsModelInitialState,
} from '~/models/announcement.model';
import {
  PersonConversationsModel,
  PersonConversationsModelInitialState,
} from '~/models/person.model';

export interface ConversationTypes {
  _id: string;
  announcement: AnnouncementConversationsModel;
  created_at: string;
  person_from: PersonConversationsModel;
  person_to: PersonConversationsModel;
}

export const ConversationTypesInitialState: ConversationTypes = {
  _id: '',
  announcement: AnnouncementConversationsModelInitialState,
  created_at: '',
  person_from: PersonConversationsModelInitialState,
  person_to: PersonConversationsModelInitialState,
};

export interface ConversationTypesWithPageNumber {
  conversations: ConversationTypes[];
  meta: MetaTypes;
}

export const ConversationTypesWithPageNumberInitialState = {
  conversations: [ConversationTypesInitialState],
  meta: MetaTypesInitialState,
};

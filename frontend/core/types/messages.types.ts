import { PersonConversationsModel } from '~/models/person.model';
import { AnnouncementsTypes } from '~/types/announcements.types';
import { PersonTypes } from '~/types/person.types';

export interface MessagesTypes {
  id: number;
  from: PersonTypes;
  to: PersonTypes;
  announcement: AnnouncementsTypes;
  type: string;
  date: string;
  messages: number;
}

export interface Message {
  id: number;
  from: string;
  message: string;
  date: string;
}

export interface MessageType {
  messages_id: number;
  announcement_id: number;
  messages: Message[];
}

export interface MessageConversationType {
  announcement: string;
  content: string;
  conversation: string;
  created_at: string;
  person: PersonConversationsModel;
  _id: string;
}

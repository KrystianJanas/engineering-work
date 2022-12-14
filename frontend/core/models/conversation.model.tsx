import { AnnouncementConversationsModel } from '~/models/announcement.model';
import { PersonConversationsModel } from '~/models/person.model';

export interface ConversationTypes {
  _id: string;
  announcement: AnnouncementConversationsModel;
  created_at: string;
  person_from: PersonConversationsModel;
  person_to: PersonConversationsModel;
}

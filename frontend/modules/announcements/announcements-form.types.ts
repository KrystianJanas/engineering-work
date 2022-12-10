import { AnnouncementsModel } from '~/models/announcements.model';

export interface AnnouncementsFormTypes {
  announcement: AnnouncementsModel;
  onSubmit: (data: AnnouncementsModel) => void;
}

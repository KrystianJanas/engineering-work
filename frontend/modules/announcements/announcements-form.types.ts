import { Announcement } from './announcements.types';

export interface AnnouncementsFormTypes {
  announcement?: Announcement;
  onSubmit: (data: Announcement) => void;
}

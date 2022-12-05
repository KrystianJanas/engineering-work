import { Announcement } from './announcements.types';

export const AnnouncementsInitialState: Announcement = {
  id: 0,
  person: {
    _id: 0,
    name: '',
  },
  title: '',
  description: '',
  location: '',
  state: '',
  size: 0,
  rooms: 0,
  fee: 0,
  rent: 0,
  images: [],
};

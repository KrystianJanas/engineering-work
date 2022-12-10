import { AnnouncementsModel } from '~/models/announcements.model';

export const AnnouncementsInitialState: AnnouncementsModel = {
  _id: '0',
  person: '0',
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

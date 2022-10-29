import { Announcement } from './announcements.types';

export const AnnouncementsInitialState: Announcement[] = [
  {
    id: 1,
    title: 'Testowy apartament w centrum miasta 1',
    location: 'Rzeszów',
    size: 51,
    state: 'Stan deweloperski',
    fee: 1500,
    rent: 500,
    date_add: '2022-11-10',
    imageUrl:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    rooms: 1,
  },
  {
    id: 2,
    title: 'Testowy apartament w centrum miasta 2',
    location: 'Rzeszów',
    size: 52,
    state: 'Stan deweloperski',
    fee: 1500,
    rent: 500,
    date_add: '2022-11-10',
    rooms: 2,
  },
  {
    id: 3,
    title: 'Testowy apartament w centrum miasta 3',
    location: 'Rzeszów',
    size: 53,
    state: 'Stan deweloperski',
    fee: 1500,
    rent: 500,
    date_add: '2022-11-10',
    rooms: 3,
  },
  {
    id: 4,
    title: 'Testowy apartament w centrum miasta 4',
    location: 'Rzeszów',
    size: 54,
    state: 'Stan deweloperski',
    fee: 1500,
    rent: 500,
    date_add: '2022-11-10',
    rooms: 4,
  },
  {
    id: 5,
    title: 'Testowy apartament w centrum miasta 5',
    location: 'Rzeszów',
    size: 55,
    state: 'Stan deweloperski',
    fee: 1500,
    rent: 500,
    date_add: '2022-11-10',
    rooms: 5,
  },
];

export const AnnouncementInitialState: Announcement = {
  id: 1,
  title: 'Testowy apartament w centrum miasta 1',
  location: 'Rzeszów',
  size: 51,
  state: 'mieszkanie nieumeblowane',
  fee: 1500,
  rent: 500,
  date_add: '2022-11-10',
  imageUrl: 'https://wallpaperset.com/w/full/8/3/7/492402.jpg',
  rooms: 4,
  description:
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ' +
    'Testowy opis, aby zobaczyc jak to wyglada. Testowy opis, aby zobaczyc jak to wyglada. ',
  views: 350,
  advertiser: { name: 'Tadeusz', phone: 123456789 },
};

import { PersonTypes } from '~/types/person.types';

export interface AnnouncementsTypes {
  id?: number;
  advertiser?: PersonTypes;
  title?: string;
  description?: string;
  image_url?: string;
}

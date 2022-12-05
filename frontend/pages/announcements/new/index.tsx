import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';

export const AnnouncementsNewPage = () => {
  return (
    <AnnouncementsForm onSubmit={(data) => console.log('to api new: ', data)} />
  );
};
export default AnnouncementsNewPage;

import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { useAuth } from '~/components/contexts/useContextProvider';
import { testImageUrl } from '~/constants/GLOBAL.constants';

import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';
import { AnnouncementsValidation } from '../../../modules/announcements/components/announcements.validation';

export const AnnouncementsNewPage = () => {
  const { personID } = useAuth();

  const router = useRouter();

  const postAnnouncements = async (data: any) => {
    const result = await postQuery('announcements', data);

    if (result && result.status === 201) {
      await router.push('/announcements');
      toast.success('Pozytywnie stworzono nowe ogłoszenie.');
    } else {
      toast.error(
        'Coś poszło nie tak... Spróbuj przeładować stronę i dodać dane ponownie.'
      );
    }
  };

  return (
    <AnnouncementsForm
      onSubmit={({ _id, person, images, ...rest }) => {
        const dataToApi: any = {
          person: personID,
          images: [testImageUrl, testImageUrl], // TODO: convert pictures array to string array list
          ...rest,
        };

        console.log(dataToApi);

        const { error } = AnnouncementsValidation(dataToApi);
        if (error) {
          return toast.error(error);
        }

        return postAnnouncements(dataToApi);
      }}
    />
  );
};
export default AnnouncementsNewPage;

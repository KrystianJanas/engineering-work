import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { testImageUrl } from '~/GLOBAL.constants';
import { updateQuery } from '~/api/update';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementModel,
  AnnouncementModelInitialState,
} from '~/models/announcement.model';

import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';
import { AnnouncementsValidation } from '../../../modules/announcements/components/announcements.validation';

export const AnnouncementEditPage = () => {
  // todo: make protection: if you're not owner this announcement, you are redirect ...

  const router = useRouter();
  const { personID } = useAuth();

  const updateFunction = async (data: any) => {
    const result = await updateQuery(`announcements/${router.query.id}`, data);

    if (result && result.status === 200) {
      await router.push('/management');
      toast.success('Pozytywnie edytowano ogłoszenie.');
    } else {
      toast.error(
        'Coś poszło nie tak... Spróbuj przeładować stronę i zaktualizować dane ponownie.'
      );
    }
  };

  const { data, isLoading } = useGetData<AnnouncementModel>(
    AnnouncementModelInitialState,
    'announcements',
    `${router.query.id}`
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (data.person._id !== personID) {
    // todo: change it to !==
    toast.error('Nie masz tu dostepu');
    router.push('/announcements').finally(() => {
      return <div>no access</div>;
    });
  }

  return (
    <AnnouncementsForm
      announcement={data}
      onSubmit={({ _id, person, images, ...rest }) => {
        const dataToApi: any = {
          person: personID,
          images: [testImageUrl, testImageUrl], // TODO: convert pictures array to string array list
          ...rest,
        };

        const { error } = AnnouncementsValidation(dataToApi);
        if (error) {
          return toast.error(error);
        }

        return updateFunction(dataToApi);
      }}
    />
  );
};
export default AnnouncementEditPage;

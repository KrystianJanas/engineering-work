import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { updateQuery } from '~/api/update';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { parseDataUploadFiles } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementsModel,
  AnnouncementsModelInitialState,
} from '~/models/announcements.model';

import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';
import { AnnouncementsValidation } from '../../../modules/announcements/components/announcements.validation';
import { uploadImage } from '../new';

export const AnnouncementEditPage = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const updateFunction = async (data: any, files: any, id: string) => {
    const result = await updateQuery(`announcements/${id}`, data);

    if (result && result.status === 201) {
      const announcementID = result.data._id;

      for (let i = 0; i <= files.length; i += 1) {
        if (i === files.length) {
          router.push(`/announcements/${announcementID}`);
          toast.success('Pozytywnie edytowano ogłoszenie.');
          return;
        }
        const formDataToApi = new FormData();
        formDataToApi.append('file', files[i]);
        formDataToApi.append(
          'datetime',
          parseDataUploadFiles(new Date().toLocaleString())
        );
        // eslint-disable-next-line no-await-in-loop
        await uploadImage(formDataToApi, announcementID);
      }
    }
    toast.error(
      'Coś poszło nie tak... Spróbuj przeładować stronę i dodać dane ponownie.'
    );
  };

  const { data, isLoading } = useGetData<AnnouncementsModel>(
    AnnouncementsModelInitialState,
    'announcements',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'edit' }
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!data && !isLoading) {
    router.push('/management');
    return <SpinnerLoading />;
  }

  return (
    <AnnouncementsForm
      announcement={data}
      onSubmit={({ _id, person, images, ...rest }, files) => {
        const dataToApi: any = {
          person: personID,
          images: [],
          ...rest,
        };

        const { error } = AnnouncementsValidation(dataToApi);
        if (error) {
          return toast.error(error);
        }

        return updateFunction(dataToApi, files, _id);
      }}
    />
  );
};
export default AnnouncementEditPage;

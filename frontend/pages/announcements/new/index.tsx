import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { postFileQuery, postQuery } from '~/api/post';
import { useAuth } from '~/components/contexts/useContextProvider';
import { parseDataUploadFiles } from '~/hooks/useDateParser';

import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';
import { AnnouncementsValidation } from '../../../modules/announcements/components/announcements.validation';

export const AnnouncementsNewPage = () => {
  const { personID } = useAuth();

  const router = useRouter();

  const uploadImage = async (formDataToApi: any, id: string) => {
    const response = await postFileQuery(
      `upload/pictures/${id}`,
      formDataToApi
    );
    if (response) {
      console.log(response.data.message);
      return 'null';
    }
    console.log(formDataToApi);
  };

  const postAnnouncements = async (data: any, files: any) => {
    const result = await postQuery('announcements', data);

    if (result && result.status === 201) {
      const announcementID = result.data._id;

      for (let i = 0; i <= files.length; i += 1) {
        if (i === files.length) {
          router.push('/announcements');
          toast.success('Pozytywnie stworzono nowe ogłoszenie.');
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

  return (
    <AnnouncementsForm
      onSubmit={({ _id, person, images, ...rest }, files) => {
        const dataToApi: any = {
          person: personID,
          images: [], // TODO: convert pictures array to string array list
          ...rest,
        };

        console.log(dataToApi);

        const { error } = AnnouncementsValidation(dataToApi);
        if (error) {
          return toast.error(error);
        }

        return postAnnouncements(dataToApi, files);
      }}
    />
  );
};
export default AnnouncementsNewPage;

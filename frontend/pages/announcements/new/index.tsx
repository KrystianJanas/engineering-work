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

  // const uploadImage = async (e: any, formDataToApi: any) => {
  //   // const response = await postFileQuery('upload/pictures', formDataToApi);
  //   // if (response) {
  //   //   console.log(response.data.message);
  //   // }
  //   console.log(formDataToApi);
  // };

  return (
    <AnnouncementsForm
      onSubmit={({ _id, person, images, ...rest }, files) => {
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

        console.log('files here new: ', files);

        // for (let i = 0; i < e.target.files.length; i += 1) {
        //   const formDataToApi = new FormData();
        //   formDataToApi.append('estate_id', 'tustringnieruchomosciid');
        //   formDataToApi.append('file', e.target.files[i]);
        //   // uploadImage(e, formDataToApi);
        //   // send it after `zatwierdz zmiany` button
        // }

        // return postAnnouncements(dataToApi);
      }}
    />
  );
};
export default AnnouncementsNewPage;

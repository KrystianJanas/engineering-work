import axios from 'axios';

import { AnnouncementsForm } from '../../../modules/announcements/components/announcements-form';

export const AnnouncementsNewPage = () => {
  const sendData = async (data: any) => {
    const result = await axios.post(
      'http://localhost:3001/api/announcements',
      data
    );
    console.log('result: ', result);
    console.log('wysłane');
  };

  const sendFunction = (dataToApis: any) => {
    sendData(dataToApis).then((r) => console.log(r));
  };

  return (
    <AnnouncementsForm
      onSubmit={(data) => {
        const dataToApi: any = {
          ...data,
          person: '638a765c53adff6e06432323',
          _id: undefined,
        }; // TODO: get person id from context
        console.log(dataToApi);
      }}
    />
  );
};
export default AnnouncementsNewPage;

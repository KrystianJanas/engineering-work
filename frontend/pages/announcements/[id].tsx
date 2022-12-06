import { useState } from 'react';

import { useRouter } from 'next/router';

import { getPage } from '~/api/get';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { AnnouncementModel } from '~/models/announcement.model';

import { Announcement } from '../../modules/announcements/components/id/[id]';

export const AnnouncementPage = () => {
  const router = useRouter();
  const [data, setData] = useState<AnnouncementModel>();
  const [isLoaded, setIsLoaded] = useState(true);
  if (router.isReady && router.query.id) {
    const getData = async () => {
      setIsLoaded(false);
      setData(await getPage(`announcements/${router.query.id}`));
    };
    if (!data && isLoaded) {
      getData().then(null);
    }

    if (data) {
      return <Announcement data={data} />;
    }
    return <SpinnerLoading />;
  }
  return <SpinnerLoading />;
};
export default AnnouncementPage;

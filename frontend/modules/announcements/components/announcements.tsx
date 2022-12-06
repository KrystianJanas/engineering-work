import { useState } from 'react';

import Link from 'next/link';

import { getPage } from '~/api/get';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { AnnouncementsModel } from '~/models/announcements.model';

export const AnnouncementsView = () => {
  const [data, setData] = useState<[]>();
  const [isLoaded, setIsLoaded] = useState(true);

  const getData = async () => {
    setIsLoaded(false);
    setData(await getPage('announcements'));
  };
  if (!data && isLoaded) {
    getData().then(null);
  }

  return (
    <Layout>
      {data && data.length > 0 ? (
        <Layout>
          <Layout display="flex" justifyContent="center" marginTop={15}>
            <Link href="announcements/new" passHref>
              <a>
                <AddButton />
              </a>
            </Link>
          </Layout>
          <Layout
            display="flex"
            justifyContent="center"
            wrap="wrap"
            padding={[10, 0]}
          >
            {data.map((announcement: AnnouncementsModel) => (
              <AnnouncementCard
                key={announcement.created_at}
                announcement={announcement}
              />
            ))}
          </Layout>
        </Layout>
      ) : (
        <Layout
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={25}
        >
          <SpinnerLoading />
        </Layout>
      )}
    </Layout>
  );
};

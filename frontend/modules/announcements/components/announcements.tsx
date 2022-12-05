import axios from 'axios';
import Link from 'next/link';

import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Layout } from '~/components/molecules/layout';

import { AnnouncementsInitialState } from '../announcements.constants';

export const AnnouncementsView = () => {
  const getData = async () => {
    const { data } = await axios.get('http://localhost:3001/api/announcements');
    console.log(data);
  };

  getData();

  return (
    <Layout>
      <Layout display="flex" justifyContent="center" marginTop={15}>
        <Link href="announcements/new" passHref>
          <AddButton />
        </Link>
      </Layout>
      <Layout
        display="flex"
        justifyContent="center"
        wrap="wrap"
        padding={[10, 0]}
      >
        {AnnouncementsInitialState.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </Layout>
    </Layout>
  );
};

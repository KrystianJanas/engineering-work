import Link from 'next/link';

import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementsModel,
  AnnouncementsModelInitialState,
} from '~/models/announcements.model';

export const AnnouncementsView = () => {
  const { data, isLoading } = useGetData<AnnouncementsModel[]>(
    [AnnouncementsModelInitialState],
    'announcements'
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
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
  );
};

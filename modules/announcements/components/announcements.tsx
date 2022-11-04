import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Layout } from '~/components/molecules/layout';

import { AnnouncementsInitialState } from '../announcements.constants';

export const AnnouncementsView = () => {
  return (
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
  );
};

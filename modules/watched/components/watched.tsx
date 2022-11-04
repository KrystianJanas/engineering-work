import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Layout } from '~/components/molecules/layout';

import { Announcement } from '../../announcements/announcements.types';

export const Watched = ({ watched }: { watched: Announcement }) => {
  return (
    <Layout display="flex" justifyContent="center" wrap="wrap">
      {/* todo: Lets modify it into watched offerts */}
      <AnnouncementCard key={watched.id} announcement={watched} />
    </Layout>
  );
};

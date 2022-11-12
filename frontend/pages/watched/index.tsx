import { AnnouncementsInitialState } from '../../modules/announcements/announcements.constants';
import { Announcement } from '../../modules/announcements/announcements.types';
import { Watched } from '../../modules/watched/components';

export const WatchedPage = () => {
  return AnnouncementsInitialState.map((announcement: Announcement) => {
    /* todo: Lets modify it into watched offerts */
    return <Watched key={announcement.id} watched={announcement} />;
  });
};
export default WatchedPage;

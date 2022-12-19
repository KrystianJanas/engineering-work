import { Text } from '~/components/atoms/typography';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementsModel,
  AnnouncementsModelInitialState,
} from '~/models/announcements.model';

export const ObservedView = () => {
  const { data, isLoading } = useGetData<AnnouncementsModel[]>(
    [AnnouncementsModelInitialState],
    'observed',
    '638fb4c573eedbc3f53f214e' // TODO: change to user/person id
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <Layout>
      <Layout
        display="flex"
        justifyContent="center"
        wrap="wrap"
        padding={[10, 0]}
      >
        {data.length > 0 ? (
          data.map(
            (
              announcement: any // todo: let's type it
            ) => (
              <AnnouncementCard
                typeView="observed"
                key={announcement.created_at}
                announcement={announcement.announcement}
                rest={announcement}
              />
            )
          )
        ) : (
          <Layout display="flex" justifyContent="center">
            <Text>
              Nie masz żadnych ogłoszeń w zakładce <b>Obserwowane</b>.
            </Text>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

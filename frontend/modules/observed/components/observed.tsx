import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Pagination } from '~/components/compounds/Pagination';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import { usePagination } from '~/hooks/usePagination/usePagination';
import {
  AnnouncementsModelData,
  AnnouncementsModelDataInitialState,
} from '~/models/announcements.model';

export const ObservedView = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const {
    page,
    setPage,
    maxPage,
    setMaxPage,
    onPreviousPage,
    onNextPage,
    perPage,
  } = usePagination(1, 5);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const actualQueryPage = Number(router.query.pageNum) || 1;
    router.push({
      query: {
        ...router.query,
        pageNum: actualQueryPage,
      },
    });
    setPage(actualQueryPage);
  }, [router.isReady]);

  const { data, isLoading } = useGetData<AnnouncementsModelData>(
    AnnouncementsModelDataInitialState,
    'observed',
    `${personID}`,
    page,
    perPage
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (maxPage === 0) {
    setMaxPage(data.meta.totalPages);
  }

  return (
    <Layout>
      <Layout
        display="flex"
        justifyContent="center"
        wrap="wrap"
        padding={[10, 0]}
      >
        {data.announcements.length > 0 ? (
          data.announcements.map((announcement: any) => (
            <AnnouncementCard
              typeView="observed"
              key={announcement.created_at}
              announcement={announcement.announcement}
              rest={announcement}
            />
          ))
        ) : (
          <Layout display="flex" justifyContent="center">
            <Text>
              Nie masz żadnych ogłoszeń w zakładce <b>Obserwowane</b>.
            </Text>
          </Layout>
        )}
      </Layout>
      {maxPage > 1 && (
        <Layout
          display="flex"
          justifyContent="right"
          marginTop={15}
          marginRight={25}
        >
          <Pagination
            page={page}
            maxPage={maxPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        </Layout>
      )}
    </Layout>
  );
};

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Pagination } from '~/components/compounds/Pagination';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import { usePagination } from '~/hooks/usePagination/usePagination';
import {
  AnnouncementsModel,
  AnnouncementsModelData,
  AnnouncementsModelDataInitialState,
} from '~/models/announcements.model';

export const AnnouncementsView = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

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
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
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
    'announcements',
    '',
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
      <Layout display="flex" justifyContent="center" marginTop={15}>
        <Link href="announcements/new" passHref>
          <a>
            <AddButton />
          </a>
        </Link>
      </Layout>
      <Layout
        display="flex"
        alignItems="center"
        direction="column"
        padding={[10, 0]}
      >
        {data.announcements && data.announcements.length > 0 ? (
          data.announcements.map((announcement: AnnouncementsModel) => (
            <AnnouncementCard
              key={announcement.created_at}
              announcement={announcement}
            />
          ))
        ) : (
          <Layout display="flex" justifyContent="center">
            <Text>Nie znaleziono żadnych ogłoszeń w tym momencie.</Text>
          </Layout>
        )}
        {maxPage > 1 && (
          <Layout
            display="flex"
            marginLeft="auto"
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
    </Layout>
  );
};

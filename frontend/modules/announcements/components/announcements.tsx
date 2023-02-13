import { useEffect, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { Button } from '~/components/compounds/Button';
import { Pagination } from '~/components/compounds/Pagination';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { CITIES } from '~/constants/CITIES.constants';
import { useGetData } from '~/hooks/useGetData';
import { usePagination } from '~/hooks/usePagination/usePagination';
import {
  AnnouncementsModel,
  AnnouncementsModelData,
  AnnouncementsModelDataInitialState,
} from '~/models/announcements.model';

export const AnnouncementsView = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState(0);

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

  const { data, isLoading, setUpdateState } =
    useGetData<AnnouncementsModelData>(
      AnnouncementsModelDataInitialState,
      'announcements',
      '',
      page,
      perPage,
      {
        personID,
        typeView: 'view',
        location: location.length > 2 ? location : undefined,
        rooms: rooms > 0 ? rooms : undefined,
      }
    );

  useEffect(() => {
    setUpdateState(true);
  }, [location, rooms]);

  useEffect(() => {
    setMaxPage(0);
  }, [data]);

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
        direction="column"
        alignItems="center"
        gap="10px"
        marginTop={15}
      >
        <Layout display="flex" direction="row" gap="25px">
          <Layout width={250}>
            <Autocomplete
              size="small"
              options={CITIES.map((city) => `${city.city}`)}
              value={location}
              onChange={(event, newValue) => {
                setLocation(newValue || '');
              }}
              noOptionsText="Nie znaleziono dopasowanych wyników..."
              renderInput={(params) => (
                <TextField {...params} label="Miejscowość" />
              )}
              disablePortal
            />
          </Layout>
          <Layout width={140}>
            <TextField
              label="Liczba pokoi"
              size="small"
              type="number"
              value={rooms === 0 ? '' : rooms}
              onChange={(e) => {
                const newValue = e.target.value;
                if (
                  newValue === '' ||
                  (newValue[0] === '-' && newValue.length === 1)
                ) {
                  setRooms(Number(newValue));
                } else if (
                  // eslint-disable-next-line no-restricted-globals
                  !isNaN(Number(newValue)) &&
                  Number(newValue) >= 0
                ) {
                  setRooms(Number(newValue));
                }
              }}
            />
          </Layout>
        </Layout>
        <Layout display="flex">
          <Button
            text="Dodaj nowe ogłoszenie"
            onSubmit={() => router.push('/announcements/new')}
          />
        </Layout>
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

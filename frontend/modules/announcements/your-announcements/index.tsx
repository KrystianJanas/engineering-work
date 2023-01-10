import { useState } from 'react';

import styled from '@emotion/styled';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { AnnouncementCard } from '~/components/compounds/Announcement-Card';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementsModel,
  AnnouncementsModelInitialState,
} from '~/models/announcements.model';

const StyledB = styled.b`
  &:hover {
    cursor: pointer;
  }
`;

const StyledText = styled(Text)`
  &:hover {
    color: var(--text-light-green);
  }
`;

export const YourAnnouncements = () => {
  const { personID } = useAuth();

  const [typeAnnouncements, setTypeAnnouncements] = useState(true); // true: ogloszenia aktywne ; false: nieaktywne

  const { data: activeAnnouncements, isLoading } = useGetData<
    AnnouncementsModel[]
  >(
    [AnnouncementsModelInitialState],
    'announcements',
    `person/${personID}/true`
  );

  const { data: desactiveAnnouncements, isLoading: isLoading2 } = useGetData<
    AnnouncementsModel[]
  >(
    [AnnouncementsModelInitialState],
    'announcements',
    `person/${personID}/false`
  );

  if (isLoading || isLoading2) {
    return <SpinnerLoading />;
  }

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout width="100%">
        {(activeAnnouncements &&
          activeAnnouncements.length > 0 &&
          activeAnnouncements[0]._id.length > 0) ||
        (desactiveAnnouncements &&
          desactiveAnnouncements.length > 0 &&
          desactiveAnnouncements[0]._id.length > 0) ? (
          <>
            <Layout display="flex" justifyContent="center" gap="50px">
              <StyledText
                color={
                  typeAnnouncements ? 'var(--text-green)' : 'var(--text-grey)'
                }
                weight={typeAnnouncements ? 700 : 400}
                onClick={() => setTypeAnnouncements(true)}
              >
                Aktywne
              </StyledText>
              <StyledText
                color={
                  !typeAnnouncements ? 'var(--text-green)' : 'var(--text-grey)'
                }
                weight={!typeAnnouncements ? 700 : 400}
                onClick={() => setTypeAnnouncements(false)}
              >
                Zakończone
              </StyledText>
            </Layout>
            <Layout
              marginTop={30}
              display="flex"
              alignItems="center"
              direction="column"
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {typeAnnouncements ? (
                activeAnnouncements.length > 0 ? (
                  activeAnnouncements.map(
                    (announcement: AnnouncementsModel) => (
                      <AnnouncementCard
                        key={announcement._id}
                        announcement={announcement}
                        edit
                        minWidth="1100px"
                      />
                    )
                  )
                ) : (
                  <Text textAlign="center" weight={400}>
                    Nie posiadasz ogłoszeń, które obecnie są <b>aktywne</b>.
                  </Text>
                )
              ) : desactiveAnnouncements.length > 0 ? (
                desactiveAnnouncements.map(
                  (announcement: AnnouncementsModel) => (
                    <AnnouncementCard
                      key={announcement.created_at}
                      announcement={announcement}
                      noObserved
                      minWidth="1100px"
                    />
                  )
                )
              ) : (
                <Text textAlign="center" weight={400}>
                  Nie posiadasz ogłoszeń, które obecnie są <b>nieaktywne</b>.
                </Text>
              )}
            </Layout>
          </>
        ) : (
          <Layout display="flex" alignItems="center" direction="column">
            <Text>Nie posiadasz aktualnie żadnych ogłoszeń.</Text>
            <Text>Twoja historia ogłoszeń również jest pusta.</Text>
            <Text>&nbsp;</Text>
            <Text>
              Jeśli chcesz dodać nowe ogłoszenie,{' '}
              <Link href="/announcements/new" passHref>
                <StyledB>przyciśnij tutaj</StyledB>
              </Link>
              .
            </Text>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

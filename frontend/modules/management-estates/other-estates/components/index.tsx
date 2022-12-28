import { useState } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { parseData, parseHour } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateInvitationsModel,
  EstateInvitationsModelInitialState,
} from '~/models/estateInvitations.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledLayoutView = styled(Layout)<{
  checkedOption: boolean;
  optionMessage: boolean;
}>`
  border: ${(props) =>
    props.checkedOption === props.optionMessage
      ? `2px solid rgba(18, 185, 172, 1)`
      : undefined};

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
  }
`;

const StyledButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

export const ManagementOtherEstates = () => {
  const { personID } = useAuth();
  const router = useRouter();

  const [view, setView] = useState(false); // false: wynajmowane, true: zaproszenia do wynajmu

  const { data, isLoading } = useGetData<EstateModel[]>(
    [EstatesModelInitialState],
    'estates',
    `renter/${personID}/true`
  ); // nieruchomości wynajmowane

  const { data: dataInvitations, isLoading: isLoadingInvitations } = useGetData<
    EstateInvitationsModel[]
  >([EstateInvitationsModelInitialState], 'estatesInvitations', `${personID}`);

  if (isLoading || isLoadingInvitations) {
    <SpinnerLoading />;
  }

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout width="100%">
        <Layout
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="25px"
          marginBottom={25}
        >
          <StyledButton onClick={() => setView(false)}>
            <StyledLayoutView
              display="flex"
              width={250}
              height={50}
              background="var(--background-white)"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              checkedOption={false}
              optionMessage={view}
            >
              <Text size={getRem(18)}>
                <b>Wynajmowane</b>
              </Text>
            </StyledLayoutView>
          </StyledButton>
          <StyledButton onClick={() => setView(true)}>
            <StyledLayoutView
              display="flex"
              width={250}
              height={50}
              background="var(--background-white)"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              checkedOption
              optionMessage={view}
            >
              <Text size={getRem(18)}>
                <b>Prośby o zatwierdzenie</b>
              </Text>
            </StyledLayoutView>
          </StyledButton>
        </Layout>

        {!view ? (
          <Layout width="100%">
            {data && data.length > 0 ? (
              <Layout display="flex" direction="column" alignItems="center">
                {data.map((estate) => (
                  <StyledLayout
                    key={estate._id}
                    display="flex"
                    direction="column"
                    width="75%"
                    background="var(--background-white)"
                    borderRadius="10px"
                    boxShadow="0px 0px 16px rgba(0, 0, 0, 0.24)"
                    margin={[15]}
                    padding={[10]}
                    onClick={() =>
                      router.push(`/management/estates/${estate._id}`)
                    }
                  >
                    <Text textAlign="center" size={getRem(18)}>
                      {estate.title}
                    </Text>
                    <Text textAlign="center" size={getRem(16)}>
                      Lokalizacja: {estate.location}
                    </Text>
                    <Text>&nbsp;</Text>
                    <Text size={getRem(14)} textAlign="center">
                      Odstępne: <b>{estate.fee} PLN</b>/miesiąc
                    </Text>
                    <Text size={getRem(14)} textAlign="center">
                      Czynsz: <b>{estate.rent} PLN</b>/miesiąc
                    </Text>
                    <Text size={getRem(14)} textAlign="center">
                      Kaucja zwrotna: <b>{estate.caution} PLN</b>/miesiąc
                    </Text>
                    <Text>&nbsp;</Text>
                    <Text size={getRem(12)} textAlign="center">
                      Nieruchomość utworzona{' '}
                      {parseData(estate.created_at || '')} o godzinie{' '}
                      {parseHour(estate.created_at || '')}
                    </Text>
                  </StyledLayout>
                ))}
              </Layout>
            ) : (
              <Layout
                marginTop={20}
                background="white"
                padding={[25]}
                borderRadius="10px"
                marginRight={15}
              >
                <Text textAlign="center" weight={400}>
                  Nie posiadasz aktualnie żadnych wynajętych nieruchomości.
                </Text>
                <Text textAlign="center" weight={400}>
                  Jeśli zostaniesz dodajęty jako najemca do nieruchomości,
                  pojawi się ona w tym miejscu.
                </Text>
              </Layout>
            )}
          </Layout>
        ) : (
          <Layout
            marginTop={20}
            background="white"
            padding={[25]}
            borderRadius="10px"
            marginRight={15}
          >
            {dataInvitations.map((invitation) => {
              return (
                <Layout key={invitation.estate._id}>
                  <Layout
                    background="var(--white)"
                    borderRadius="8px"
                    boxShadow="0 0 5px var(--border-black)"
                    padding={[10, 15]}
                  >
                    <Text textAlign="center" size={getRem(18)}>
                      Zaproszenie do wynajmu nieruchomości od{' '}
                      {invitation.person.name} (tel.{' '}
                      {invitation.person.phone_number || 'nie podano'})
                    </Text>
                    &nbsp;
                    <Text textAlign="left">
                      <b>Lokalizacja nieruchomości:</b>{' '}
                      {invitation.estate.location}
                    </Text>
                    <Text textAlign="left">
                      <b>Metraż: </b>
                      {invitation.estate.size} m<sup>2</sup>,{' '}
                      <b>liczba pokoi: </b> {invitation.estate.rooms},{' '}
                      <b>wyposażenie:</b> {invitation.estate.state}
                    </Text>
                    <Text textAlign="left">
                      <b>Odstępne: </b>
                      {invitation.estate.fee} PLN/miesiąc, <b>czynsz: </b>ok.{' '}
                      {invitation.estate.rent} PLN/miesiąc,{' '}
                      <b>kaucja zwrotna:</b> {invitation.estate.caution} PLN
                    </Text>
                  </Layout>
                </Layout>
              );
            })}
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

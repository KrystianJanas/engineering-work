import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { parseData, parseHour } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

export const ManagementEstates = () => {
  const { personID } = useAuth();
  const router = useRouter();

  const { data, isLoading } = useGetData<EstateModel[]>(
    [EstatesModelInitialState],
    'estates',
    `person/${personID}/true`
  );

  if (isLoading) {
    <SpinnerLoading />;
  }

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout width="100%">
        <Layout display="flex" justifyContent="center">
          <AddButton
            text="Dodaj nową nieruchomość"
            onClick={() => router.push('/management/estates/new')}
          />
        </Layout>
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
                onClick={() => router.push(`/management/estates/${estate._id}`)} // todo: send data into component
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
                  Nieruchomość utworzona {parseData(estate.created_at || '')} o
                  godzinie {parseHour(estate.created_at || '')}
                </Text>
              </StyledLayout>
            ))}
          </Layout>
        ) : (
          <Layout marginTop={20}>
            <Text textAlign="center" weight={400}>
              Nie posiadasz aktualnie żadnych nieruchomości.
            </Text>
            <Text textAlign="center" weight={400}>
              Możesz je dodać korzystając z ikony <b>+</b>
            </Text>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

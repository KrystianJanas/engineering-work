import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';

const StyledLayout = styled(Layout)`
  background: url('/dashboard.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - (100px));
`;

const StyledContainer = styled(Layout)`
  text-align: center;
`;

const StyledText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

const Home: NextPage = () => {
  return (
    <StyledLayout display="flex" justifyContent="center" alignItems="center">
      <StyledContainer display="flex" padding={[10]} direction="column">
        <Text
          color="white"
          size="1.5rem"
          weight={700}
          textShadow="1px 1px 5px black"
          fontFamily="Verdana"
        >
          Witaj w serwisie nieruchomości!
        </Text>
        <Text weight={600} color="white">
          Serwis ten skierowany jest dla osób poszukujących nieruchomości do
          wynajmu.
        </Text>
        <Text weight={600} color="white">
          Oferujemy możliwość zdalnego zarządzania i rozliczeń nieruchomości,
          wraz z intregracją pomiędzy lokatorami.
        </Text>
        <Link href="/announcements" passHref>
          <StyledText
            color="white"
            size="1.25rem"
            weight={700}
            textShadow="1px 1px 5px black"
            fontFamily="Verdana"
          >
            AKTUALNE OFERTY MIESZKAŃ
          </StyledText>
        </Link>
      </StyledContainer>
    </StyledLayout>
  );
};

export default Home;

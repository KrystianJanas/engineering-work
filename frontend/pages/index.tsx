import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  background: url('/dashboard.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: calc(100% - (100px));
`;

const StyledContainer = styled(Layout)`
  @media (min-width: 0px) and (max-width: 768px) {
    display: none;
  }
  text-align: center;
`;

const StyledContainerMobile = styled(Layout)`
  @media (min-width: 769px) {
    display: none;
  }
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
        <Text weight={600} color="white">
          Strona skierowana jest dla osób poszukujących nieruchomości do
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

      <StyledContainerMobile>
        <Text
          textAlign="center"
          color="var(--text-white)"
          weight={500}
          size={getRem(20)}
          textShadow="0 0 5px black"
        >
          Witaj w serwisie nieruchomości!
        </Text>
        &nbsp;
        <Text
          textAlign="center"
          color="var(--text-white)"
          weight={500}
          size={getRem(18)}
          textShadow="0 0 5px black"
        >
          Serwis ten umożliwia dodawanie ogłoszeń wynajmu nieruchomości i
          zarządzania nimi z poziomu panelu rozbudowanego o niezbędne
          funkcjonalności.
        </Text>
        &nbsp;
        <Text
          textAlign="center"
          color="var(--text-white)"
          weight={500}
          size={getRem(18)}
          textShadow="0 0 5px black"
        >
          Z panelu znajdującego się u góry, wybierz zakładkę do której chcesz
          przejść.
        </Text>
      </StyledContainerMobile>
    </StyledLayout>
  );
};

export default Home;

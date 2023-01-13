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
  height: calc(100vh - (100px));
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
          textAlign="center"
          color="var(--text-white)"
          weight={700}
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
          Serwis ten umożliwia dodawanie i przeglądanie istniejących ogłoszeń
          wynajmu nieruchomości
        </Text>
        <Text
          textAlign="center"
          color="var(--text-white)"
          weight={500}
          size={getRem(18)}
          textShadow="0 0 5px black"
        >
          oraz zarządzania nimi z poziomu panelu rozbudowanego o niezbędne
          funkcjonalności.
        </Text>
        &nbsp;
        <Link href="/announcements" passHref>
          <StyledText
            color="white"
            size="1.25rem"
            weight={700}
            textShadow="1px 1px 5px black"
            fontFamily="Verdana"
          >
            AKTUALNE OFERTY WYNAJMU NIERUCHOMOŚCI
          </StyledText>
        </Link>
      </StyledContainer>
    </StyledLayout>
  );
};

export default Home;

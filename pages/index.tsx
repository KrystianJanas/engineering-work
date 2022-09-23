import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';

const StyledLayout = styled(Layout)`
  background: url('/dashboard.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
`;

const StyledTitle = styled(Text)`
  text-align: center;
`;

const Home: NextPage = () => {
  return (
    <StyledLayout>
      <StyledTitle />
    </StyledLayout>
  );
};

export default Home;

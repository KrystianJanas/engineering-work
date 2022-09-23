import type { NextPage } from 'next';

import styled from '@emotion/styled';

import { Layout } from '~/components/molecules/layout';

const StyledLayout = styled(Layout)`
  background: url('/dashboard.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
`;

const Home: NextPage = () => {
  return <StyledLayout>HERE IMAGE</StyledLayout>;
};

export default Home;

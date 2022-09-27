import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';

const StyledParentLayout = styled(Layout)`
  min-height: 100%;
`;

const StyledLayout = styled(Layout)`
  border-radius: 16px;
`;

export const SignIn = () => {
  return (
    <StyledParentLayout
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <StyledLayout width={485} height={342} background="rgb(255, 255, 255)">
        <Layout display="flex" justifyContent="center" margin={[25, 0]}>
          <Text fontFamily="Inter" weight={600} size="1.35rem" color="black">
            Zaloguj się do serwisu nieruchomości
          </Text>
        </Layout>
      </StyledLayout>
    </StyledParentLayout>
  );
};

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { useAuth } from '~/components/contexts/useContextProvider';
import { getRem } from '~/styles/utils';

const StyledText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

export const GetSelectedText = (name: string, color: string, href: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { logout } = useAuth();

  const logoutFunction = async () => {
    await logout();
  };

  return (
    <StyledText
      weight={600}
      size={getRem(14)}
      lineHeight="21px"
      color={`${color}`}
      onClick={() => {
        if (router.isReady) {
          if (href === 'auth/logout') {
            logoutFunction();
            return;
          }
          router.push(`/${href}`);
        }
      }}
    >
      {name}
    </StyledText>
  );
};

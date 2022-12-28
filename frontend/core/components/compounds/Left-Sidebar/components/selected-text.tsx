import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { getRem } from '~/styles/utils';

const StyledText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

export const GetSelectedText = (name: string, color: string, href: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <StyledText
      weight={600}
      size={getRem(14)}
      lineHeight="21px"
      color={`${color}`}
      onClick={() => router.isReady && router.push(`/${href}`)}
    >
      {name}
    </StyledText>
  );
};

import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { ButtonTypes } from '~/components/compounds/Button/button.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

export const Button = ({ text, onSubmit }: ButtonTypes) => {
  return (
    <StyledLayout
      background="#12b9ac"
      borderRadius="4px"
      padding={[10, 15]}
      onClick={onSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        weight={700}
        size={getRem(14)}
        color="rgb(255, 255, 255)"
        lineHeight="138%"
      >
        {text}
      </Text>
    </StyledLayout>
  );
};

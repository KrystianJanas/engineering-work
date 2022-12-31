import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { ButtonTypes } from '~/components/compounds/Button/button.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 8px #ccc;
  }
`;

const StyledText = styled(Text)`
  text-decoration: none;
`;

export const Button = ({ text, onSubmit, width, disabled }: ButtonTypes) => {
  return (
    <StyledLayout
      background="var(--background-light-blue)"
      borderRadius="4px"
      padding={[10, 15]}
      onClick={disabled ? () => console.log('disabled') : onSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={width && width}
    >
      <StyledText
        weight={700}
        size={getRem(14)}
        color="var(--background-white)"
        lineHeight="138%"
      >
        {text}
      </StyledText>
    </StyledLayout>
  );
};

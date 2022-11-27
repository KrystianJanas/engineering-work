import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { AddButtonTypes } from '~/components/compounds/AddButton/add-button.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

export const AddButton = ({ onClick }: AddButtonTypes) => {
  return (
    <StyledLayout
      background="var(--background-light-blue)"
      width={40}
      height={40}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.16)"
      borderRadius="10px"
      onClick={onClick && onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="var(--white)" weight={300} size={getRem(32)}>
        +
      </Text>
    </StyledLayout>
  );
};

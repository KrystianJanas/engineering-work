import styled from '@emotion/styled';

import { AddButtonTypes } from '~/components/compounds/AddButton/add-button.types';
import { PlusIcon } from '~/components/icons/plus';
import { Layout } from '~/components/molecules/layout';

const StyledLayout = styled(Layout)`
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: none;
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
      <PlusIcon />
    </StyledLayout>
  );
};

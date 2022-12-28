import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { AddButtonTypes } from '~/components/compounds/AddButton/add-button.types';
import { PlusIcon } from '~/components/icons/plus';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  text-decoration: none;

  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export const AddButton = ({ onClick, text }: AddButtonTypes) => {
  return (
    <StyledLayout
      background="var(--background-light-blue)"
      width={text ? 'auto' : 40}
      height={40}
      padding={text && [0, 10]}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.16)"
      borderRadius="10px"
      onClick={onClick && onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {text ? (
        <Text
          size={getRem(16)}
          textAlign="center"
          color="var(--white)"
          weight={600}
        >
          {text}
        </Text>
      ) : (
        <PlusIcon />
      )}
    </StyledLayout>
  );
};

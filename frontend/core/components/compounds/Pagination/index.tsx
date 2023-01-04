import styled from '@emotion/styled';

import { PaginationTypes } from '~/components/compounds/Pagination/pagination.types';
import { ArrowLeft } from '~/components/icons/arrow-left';
import { ArrowRight } from '~/components/icons/arrow-right';
import { Layout } from '~/components/molecules/layout';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

export const Pagination = ({
  page,
  maxPage,
  onPreviousPage,
  onNextPage,
}: PaginationTypes) => {
  return (
    <Layout display="flex" alignItems="center" gap="20px">
      {page !== 1 && (
        <StyledLayout onClick={onPreviousPage}>
          <ArrowLeft />
        </StyledLayout>
      )}

      <Layout>
        strona <b>{page}</b> z <b>{maxPage}</b>
      </Layout>

      {page < maxPage && (
        <StyledLayout onClick={onNextPage}>
          <ArrowRight />
        </StyledLayout>
      )}
    </Layout>
  );
};

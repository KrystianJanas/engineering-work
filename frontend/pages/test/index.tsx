import { Pagination } from '~/components/compounds/Pagination';
import { Layout } from '~/components/molecules/layout';
import { usePagination } from '~/hooks/usePagination';

export const TestPage = () => {
  const { page, maxPage, onPreviousPage, onNextPage } = usePagination(5, 1);

  return (
    <Layout
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={[50]}
      gap="25px"
    >
      <Pagination
        maxPage={maxPage}
        page={page}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </Layout>
  );
};
export default TestPage;

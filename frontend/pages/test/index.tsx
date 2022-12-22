import React from 'react';

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
      {/* <Pagination */}
      {/*  maxPage={maxPage} */}
      {/*  page={page} */}
      {/*  onPreviousPage={onPreviousPage} */}
      {/*  onNextPage={onNextPage} */}
      {/* /> */}

      {/* <Images */}
      {/*  images={[testImageUrl, 'testImageUrl', testImageUrl, 'testImageUrl']} */}
      {/*  maxWidth="450px" */}
      {/* /> */}

      {/* <ModalComponent */}
      {/*  title="Usuwanie ogłoszenia" */}
      {/*  description="Czy na pewno chcesz usunąć ogłoszenie: testowe ogloszenie nr 2?" */}
      {/*  onHide={() => console.log('cofaj')} */}
      {/*  onConfirm={() => console.log('potwierdzenie')} */}
      {/*  cancelButton */}
      {/*  cancelText="Anuluj" */}
      {/*  confirmButton */}
      {/*  confirmText="Usuń" */}
      {/* /> */}
    </Layout>
  );
};
export default TestPage;

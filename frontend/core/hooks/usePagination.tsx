import { useState } from 'react';

export const usePagination = (
  maxPageInitialState?: number,
  pageInitialState?: number
) => {
  const [page, setPage] = useState(pageInitialState || 1);
  const [maxPage, setMaxPage] = useState(maxPageInitialState || 1);

  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  return { page, setPage, maxPage, setMaxPage, onPreviousPage, onNextPage };
};

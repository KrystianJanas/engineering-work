import { useEffect, useState } from 'react';

export const usePagination = (
  pageInitialState: number,
  perPageInitialState: number
) => {
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(pageInitialState);
  const [perPage, setPerPage] = useState(perPageInitialState);

  useEffect(() => {
    if (page && maxPage) {
      if (page > maxPage) {
        setPage(maxPage);
      } else if (page < 1) {
        setPage(1);
      }
    }
  }, [page, maxPage]);

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

  return {
    page,
    setPage,
    maxPage,
    setMaxPage,
    onPreviousPage,
    onNextPage,
    perPage,
    setPerPage,
  };
};

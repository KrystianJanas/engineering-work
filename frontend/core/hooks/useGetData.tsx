import { useEffect, useState } from 'react';

import { getPage } from '~/api/get';

export const useGetData = (
  pageEndpoint: string,
  restEndpoint?: string,
  params?: any
) => {
  const [data, setData] = useState({ data: [], isLoading: true });

  const fetchData = async () => {
    const result = await getPage(pageEndpoint, restEndpoint, params);
    setData({ data: result, isLoading: false });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data: data.data, isLoading: data.isLoading };
};

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getData } from '~/api/get';
import { useAuth } from '~/components/contexts/useContextProvider';

export const useGetData = <FormType,>(
  initialState: FormType,
  pageEndpoint: string,
  restEndpoint?: string,
  page?: number,
  perPage?: number,
  params?: any
) => {
  const { isAuthenticated } = useAuth();
  const [updateState, setUpdateState] = useState(false);
  const router = useRouter();

  const [data, setData] = useState<{ data: FormType; isLoading: boolean }>({
    data: initialState,
    isLoading: true,
  });

  const fetchData = async () => {
    const result = await getData(
      pageEndpoint,
      restEndpoint,
      page,
      perPage,
      params
    );
    setData({ data: result, isLoading: false });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
      return;
    }

    if (updateState) {
      setUpdateState(false);
      return;
    }
    if (router.isReady) {
      if (page && page > 0) {
        router.push(
          {
            query: {
              ...router.query,
              pageNum: page || 0,
            },
          },
          undefined,
          { scroll: false }
        );
      }

      fetchData();
    }
  }, [router.isReady, updateState, page]);

  return {
    data: data.data,
    isLoading: data.isLoading,
    updateState,
    setUpdateState,
  };
};

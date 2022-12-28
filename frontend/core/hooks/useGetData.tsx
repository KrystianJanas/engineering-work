import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { getData } from '~/api/get';

export const useGetData = <FormType,>(
  initialState: FormType,
  pageEndpoint: string,
  restEndpoint?: string,
  params?: any
) => {
  const [updateState, setUpdateState] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<{ data: FormType; isLoading: boolean }>({
    data: initialState,
    isLoading: true,
  });

  const fetchData = async () => {
    const result = await getData(pageEndpoint, restEndpoint, params);
    setData({ data: result, isLoading: false });
    console.log('useGetData()'); // todo: delete it
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (updateState) {
      return setUpdateState(false);
    }
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, updateState]);

  return {
    data: data.data,
    isLoading: data.isLoading,
    updateState,
    setUpdateState,
  };
};

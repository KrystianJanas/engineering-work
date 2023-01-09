import { CircularProgress } from '@mui/material';

import { Layout } from '~/components/molecules/layout';

export const SpinnerLoading = () => {
  return (
    <Layout display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="success" />
    </Layout>
  );
};
export default SpinnerLoading;

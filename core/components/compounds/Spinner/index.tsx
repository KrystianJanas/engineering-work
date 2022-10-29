import { Spinner } from 'react-bootstrap';

import { Layout } from '~/components/molecules/layout';

export const SpinnerLoading = () => {
  return (
    <Layout display="flex" justifyContent="center" alignItems="center">
      <Spinner animation="border" role="status" />
    </Layout>
  );
};
export default SpinnerLoading;

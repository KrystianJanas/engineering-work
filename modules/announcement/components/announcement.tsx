import { Spinner } from 'react-bootstrap';

import { useRouter } from 'next/router';

import { Layout } from '~/components/molecules/layout';

export const Announcement = () => {
  const router = useRouter();
  if (router.isReady) {
    return <div>announcement id: {router.query.id} here...</div>;
  }
  return (
    <Layout display="flex" justifyContent="center" alignItems="center">
      <Spinner animation="border" role="status" />
    </Layout>
  );
};
export default Announcement;

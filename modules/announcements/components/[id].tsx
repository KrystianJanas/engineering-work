import { useRouter } from 'next/router';

import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';

export const Announcement = () => {
  const router = useRouter();
  if (router.isReady) {
    return (
      <Layout
        display="flex"
        marginLeft="auto"
        marginRight="auto"
        width="75%"
        background="rgb(255,255,255)"
      >
        {router.query.id}
      </Layout>
    );
  }
  return <SpinnerLoading />;
};
export default Announcement;

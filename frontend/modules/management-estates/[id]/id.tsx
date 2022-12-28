import { useRouter } from 'next/router';

import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';

export const ManagementEstateIDDetails = () => {
  const { personID } = useAuth();
  const router = useRouter();

  // TODO: check person permissions -> is associated with this estate?

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  console.log(data);

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout>here twice options and rest...</Layout>
    </Layout>
  );
};

import toast from 'react-hot-toast';

import _ from 'lodash';
import { useRouter } from 'next/router';

import { updateQuery } from '~/api/update';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { useActivity } from '~/hooks/useActivity';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';

import { ManagementEstatesForm } from '../../../new/components';

export const ManagementEstatesEdit = () => {
  const { personID } = useAuth();
  const router = useRouter();
  const { activity, setActivity } = useActivity();

  // TODO: check person permissions -> is associated with this estate?
  // person or renter...

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'edit' }
  );

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!data && !isLoading) {
    redirectedFunction();
    console.log('redirect');
    return <SpinnerLoading />;
  }

  const updateEstate = async (dataToApi: any) => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const response = await updateQuery(`estates/${router.query.id}`, dataToApi);
    if (response) {
      await router.push('/management/estates');
      toast.success('Pomyślnie edytowano nieruchomość.');
    }
    return null;
  };

  return (
    <ManagementEstatesForm
      estate={data}
      onSubmit={(submitData) => {
        const dataToApi = _.omit(
          submitData,
          '_id',
          'updated_at',
          '__v',
          'views',
          'created_at',
          'status',
          'images',
          'person',
          'renter'
        );
        updateEstate(dataToApi);
      }}
    />
  );
};

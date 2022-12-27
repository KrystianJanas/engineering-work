import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { useAuth } from '~/hooks/useContextProvider';
import { EstateModel } from '~/models/estates.model';

import { ManagementEstatesForm } from '../../../../modules/management/new/components';

export const ManagementEstatesAddPage = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const postEstates = async ({
    _id,
    status,
    updated_at,
    created_at,
    ...rest
  }: EstateModel) => {
    const data = { ...rest, person: personID };
    console.log(data);
    const result = await postQuery('estates', { ...rest, person: personID });
    if (result) {
      toast.success(
        'Pomyślnie dodano nieruchomość. Możesz teraz nią zarządzać.'
      );
      router.push('/management/estates');
    }
  };

  return (
    <ManagementEstatesForm
      onSubmit={(data) => {
        postEstates(data);
      }}
    />
  );
};
export default ManagementEstatesAddPage;

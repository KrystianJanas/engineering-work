import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { useAuth } from '~/components/contexts/useContextProvider';
import { EstateModel } from '~/models/estates.model';

import { ManagementEstatesForm } from '../../../../modules/management-estates/new/components';

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
    const result = await postQuery('estates', { ...rest, person: personID });
    if (result) {
      await router.push('/management/estates');
      toast.success(
        'Pomyślnie dodano nieruchomość. Możesz teraz nią zarządzać.'
      );
    } else {
      toast.error('Coś poszło nie tak... Spróbuj ponownie później.');
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

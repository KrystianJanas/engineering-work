import { ManagementEstatesForm } from '../../../../modules/management/new/components';

export const ManagementEstatesAddPage = () => {
  return (
    <ManagementEstatesForm
      onSubmit={(data) => {
        console.log(data);
      }}
    />
  );
};
export default ManagementEstatesAddPage;

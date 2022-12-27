import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { Layout } from '~/components/molecules/layout';

export const ManagementOtherEstatesPage = () => {
  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      tu cos dalej,...
    </Layout>
  );
};
export default ManagementOtherEstatesPage;

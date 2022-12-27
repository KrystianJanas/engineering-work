import { Text } from '~/components/atoms/typography';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar/components';
import { options } from '~/components/compounds/Left-Sidebar/left-sidebar.constants';
import { Layout } from '~/components/molecules/layout';

export const Management = () => {
  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout
        background="var(--background-white)"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        width="100%"
        height="100%"
        padding={[40]}
      >
        <Text> Wybierz odpowiednią zakładkę w panelu bocznym.</Text>
        <Text>Zostaniesz wówczas przekierowany do odpowiedniego działu.</Text>
      </Layout>
    </Layout>
  );
};

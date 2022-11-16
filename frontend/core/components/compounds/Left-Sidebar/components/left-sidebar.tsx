import { Text } from '~/components/atoms/typography';
import { getSelectedText } from '~/components/compounds/Left-Sidebar/components/selected-text';
import { LeftSidebarTypes } from '~/components/compounds/Left-Sidebar/left-sidebar.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

export const LeftSidebar = ({
  options,
  onClick,
  selected,
}: LeftSidebarTypes) => {
  const getSelectedItem = () => {
    return options.find((option) => option.name === selected);
  };

  return (
    <Layout width={232} display="flex" direction="column" marginLeft={25}>
      <Layout marginBottom={25}>
        <Text
          weight={600}
          size={getRem(18)}
          lineHeight="27px"
          color="var(--text-black)"
        >
          {getSelectedItem()?.name}
        </Text>
        <Text
          weight={500}
          size={getRem(14)}
          lineHeight="21px"
          color="var(--text-grey)"
        >
          {getSelectedItem()?.placeholder}
        </Text>
      </Layout>
      {options.map((option) => {
        return (
          <Layout marginTop={15} marginBottom={15} key={option.href}>
            {getSelectedItem()?.name === option.name
              ? getSelectedText(option.name, 'var(--text-green)', onClick)
              : getSelectedText(option.name, 'var(--text-black)', onClick)}
          </Layout>
        );
      })}
    </Layout>
  );
};

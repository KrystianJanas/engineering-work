import { router } from 'next/client';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { getSelectedText } from '~/components/compounds/Left-Sidebar/components/selected-text';
import { LeftSidebarTypes } from '~/components/compounds/Left-Sidebar/left-sidebar.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

export const LeftSidebar = ({ options }: LeftSidebarTypes) => {
  const { pathname } = useRouter();

  const pathName = pathname.slice(1, pathname.length);

  const getSelectedItem = () => {
    return options.find((option) => option.href === pathName);
  };

  return (
    <Layout width={200} display="flex" direction="column" marginLeft={25}>
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
          <Layout
            marginTop={15}
            marginBottom={15}
            key={option.href}
            onClick={() => router.push(`/${option.href}`)}
          >
            {getSelectedItem()?.name === option.name
              ? getSelectedText(option.name, 'var(--text-green)')
              : getSelectedText(option.name, 'var(--text-black)')}
          </Layout>
        );
      })}
    </Layout>
  );
};

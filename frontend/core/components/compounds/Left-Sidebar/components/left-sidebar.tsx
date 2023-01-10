import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { GetSelectedText } from '~/components/compounds/Left-Sidebar/components/selected-text';
import { LeftSidebarTypes } from '~/components/compounds/Left-Sidebar/left-sidebar.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

export const LeftSidebar = ({ options }: LeftSidebarTypes) => {
  const router = useRouter();

  let pathName = router.pathname.slice(1, router.pathname.length);

  if (pathName.includes('[id]')) {
    pathName = pathName.replace('[id]', `${router.query.id}`);
  }

  const getSelectedItem = () => {
    return options.find((option) => option.href === pathName);
  };

  const filteredOptions = options.filter((option) => option.href.length > 0);

  return (
    <Layout minWidth="215px" display="flex" direction="column" marginLeft={25}>
      <Layout marginBottom={25}>
        {getSelectedItem()?.name !== getSelectedItem()?.placeholder && (
          <>
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
          </>
        )}
      </Layout>
      {filteredOptions.map((option) => {
        return (
          <Layout marginTop={15} marginBottom={15} key={option.href}>
            {getSelectedItem()?.name === option.name
              ? GetSelectedText(option.name, 'var(--text-green)', option.href)
              : GetSelectedText(option.name, 'var(--text-black)', option.href)}
          </Layout>
        );
      })}
    </Layout>
  );
};

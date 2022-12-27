import Link from 'next/link';

import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { Layout } from '~/components/molecules/layout';

import { optionsAnnouncements } from '../announcements.constants';

export const ManagementAnnouncements = ({
  changeNumber,
}: {
  changeNumber?: () => void;
}) => {
  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout>
        <Layout display="flex" justifyContent="center">
          <Link href="/management/estates/new" passHref>
            <AddButton />
          </Link>
        </Layout>
        <Layout display="flex" wrap="wrap" justifyContent="center">
          {optionsAnnouncements.map((option) => (
            <Layout
              key={option.id}
              display="flex"
              width={320}
              background="var(--background-white)"
              borderRadius="10px"
              boxShadow="0px 0px 16px rgba(0, 0, 0, 0.24)"
              margin={[15]}
              padding={[10]}
              onClick={changeNumber} // todo: send data into component
            >
              {option.name}
            </Layout>
          ))}
        </Layout>
      </Layout>
    </Layout>
  );
};

import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';

export const ManagementEstates = () => {
  // 638a765c53adff6e06432323 / 638fb4c573eedbc3f53f214e
  const personID = '638a765c53adff6e06432323'; // todo: change person_id (personID)
  const { data, isLoading } = useGetData<EstateModel[]>(
    [EstatesModelInitialState],
    'estates',
    `person/${personID}/true`
  );

  if (isLoading) {
    <SpinnerLoading />;
  }

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout width="100%">
        <Layout display="flex" justifyContent="center">
          <Link href="/management/estates/new" passHref>
            {/* todo: change ref */}
            <AddButton />
          </Link>
        </Layout>
        {data.length > 0 ? (
          <Layout display="flex" wrap="wrap" justifyContent="center">
            {data.map((option) => (
              <Layout
                key={option._id}
                display="flex"
                width={320}
                background="var(--background-white)"
                borderRadius="10px"
                boxShadow="0px 0px 16px rgba(0, 0, 0, 0.24)"
                margin={[15]}
                padding={[10]}
                onClick={() => console.log('choose estate')} // todo: send data into component
              >
                {option.title}
              </Layout>
            ))}
          </Layout>
        ) : (
          <Layout marginTop={20}>
            <Text textAlign="center" weight={400}>
              Nie posiadasz aktualnie żadnych nieruchomości.
            </Text>
            <Text textAlign="center" weight={400}>
              Możesz je dodać korzystając z ikony <b>+</b>
            </Text>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};

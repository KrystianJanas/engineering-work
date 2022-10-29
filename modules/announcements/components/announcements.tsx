import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

import { AnnouncementsInitialState } from '../announcements.constants';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  &:hover {
    //TODO: make a color of border
    background-color: red;
  }
`;

export const AnnouncementsView = () => {
  return (
    <Layout display="flex" justifyContent="center" wrap="wrap" margin={[10, 0]}>
      {AnnouncementsInitialState.map((announcement) => (
        <Link
          key={announcement.id}
          href={{
            pathname: `/announcements/${announcement.id}`,
            // query: { id: announcement.id },
          }}
          passHref
        >
          <StyledLayout
            background="rgb(255,255,255)"
            height={200}
            margin={[10]}
            display="flex"
            borderRadius="16px"
            justifyContent="space-between"
            boxShadow="0 0 5px #ccc"
            width="75%"
          >
            <Layout
              width="180px"
              height="180px"
              margin={[10]}
              background="rgb(200, 200, 200, 0.5)"
              borderRadius="10px"
            />

            <Layout padding={[10]} display="flex" flex={1} direction="column">
              <Layout display="flex" justifyContent="left">
                <Text color="black" size={getRem(20)}>
                  {announcement.title}
                </Text>
              </Layout>
              <Layout display="flex">
                <Text color="black" size={getRem(14)}>
                  # {announcement.state}
                </Text>
              </Layout>
              <Layout display="flex" flex={1}>
                <Text color="black" size={getRem(14)}>
                  # {announcement.size} m^2
                </Text>
              </Layout>

              <Text color="black" size={getRem(16)}>
                {announcement.location} - {announcement.date_add}
              </Text>
            </Layout>

            <Layout display="flex" direction="column" padding={[10, 15]}>
              <Layout flex={1}>{announcement.price} PLN</Layout>
              <Layout display="flex" justifyContent="right">
                {/* TODO: add possibility to add offert to observed */}
                <button type="submit">
                  <StyledImage
                    src="/heart.png"
                    alt="heart"
                    width={24}
                    height={24}
                  />
                </button>
              </Layout>
            </Layout>
          </StyledLayout>
        </Link>
      ))}
    </Layout>
  );
};

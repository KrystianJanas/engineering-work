import React from 'react';
import { Image } from 'react-bootstrap';

import styled from '@emotion/styled';
import Link from 'next/link';

import { default_avatar_url } from '~/GLOBAL.constants';
import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { useDateParser } from '~/hooks/useDateParser';
import { AnnouncementsModel } from '~/models/announcements.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

export const AnnouncementCard = ({
  announcement: {
    _id,
    created_at,
    fee,
    rent,
    images,
    location,
    size,
    state,
    title,
  },
}: {
  announcement: AnnouncementsModel;
}) => {
  const { date } = useDateParser(created_at || '');

  return (
    <Layout
      background="var(--background-white)"
      height={200}
      margin={[10]}
      display="flex"
      borderRadius="16px"
      justifyContent="space-between"
      boxShadow="0 0 5px #ccc"
      width="75%"
      minWidth="1175px"
    >
      <Link
        key={_id}
        href={{
          pathname: `/announcements/${_id}`,
        }}
        passHref
      >
        <StyledLayout display="flex">
          <Layout
            width={180}
            height={180}
            margin={[10]}
            borderRadius="10px"
            boxShadow="0 0 3px #ccc"
            display="flex"
          >
            {images ? (
              <StyledImage
                src={images[0] || default_avatar_url}
                aria-hidden
                alt=""
              />
            ) : (
              <StyledImage src="no-image-icon.png" aria-hidden alt="" />
            )}
          </Layout>

          <Layout padding={[10]} display="flex" flex={1} direction="column">
            <Layout display="flex" justifyContent="left">
              <Text color="black" size={getRem(20)}>
                {title}
              </Text>
            </Layout>
            {state && (
              <Layout display="flex">
                <Text color="black" size={getRem(14)}>
                  # {state}
                </Text>
              </Layout>
            )}
            {size && (
              <Layout display="flex" flex={1}>
                <Text color="black" size={getRem(14)}>
                  # {size} m^2
                </Text>
              </Layout>
            )}
            {location && date && (
              <Text color="black" size={getRem(16)}>
                {location} - {date}
              </Text>
            )}
          </Layout>
        </StyledLayout>
      </Link>
      <Layout display="flex" direction="column" padding={[10, 15]}>
        <Text size={getRem(16)}>
          Odstępne:
          <br />
          {fee.toFixed(2)} PLN / miesiąc
        </Text>
        <Text flex={1} size={getRem(16)}>
          Czynsz:
          <br />
          {rent.toFixed(2)} PLN / miesiąc
        </Text>
        <Layout display="flex" justifyContent="right">
          {/* TODO: new possibility to new offert to observed */}
          <button
            type="submit"
            onClick={() => console.log('add to observed offerts!')}
          >
            <Image src="/heart.png" alt="heart" width={24} height={24} />
          </button>
        </Layout>
      </Layout>
    </Layout>
  );
};

import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';

import { default_avatar_url } from '~/GLOBAL.constants';
import { deleteQuery } from '~/api/delete';
import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { parseData, parseHour } from '~/hooks/useDateParser';
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

const StyledFavoriteIcon = styled(FavoriteIcon)`
  color: red;

  &:hover {
    color: rgba(255, 0, 0, 0.75);
  }
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  &:hover {
    color: red;
  }
`;

export const AnnouncementCard = ({
  announcement,
  typeView,
  rest,
}: {
  announcement: AnnouncementsModel;
  typeView?: string;
  rest?: any;
}) => {
  const [del, setDel] = useState(false);

  const date = `dodano ${parseData(
    announcement.created_at || ''
  )} o godzinie ${parseHour(announcement.created_at || '')}`;

  const personId = '638fb4c573eedbc3f53f214e'; // todo: add user/person id CHANGE IT

  const addToObserved = async (id: string) => {
    const result = await postQuery('observed', {
      announcement: id,
      person: personId,
    });
    if (result) {
      toast.success('Pomyślnie dodano ogłoszenie do ulubionych.');
    }
  };

  const removeFromObserved = async (id: string) => {
    if (!del) {
      setDel(!del);
      const result = await deleteQuery('observed', id);
      if (result) {
        toast.success('Pomyślnie usunięto ogłoszenie z ulubionych.');
        window.location.reload();
      }
    }
  };

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
        key={announcement._id}
        href={{
          pathname: `/announcements/${announcement._id}`,
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
            {announcement.images ? (
              <StyledImage
                src={announcement.images[0] || default_avatar_url}
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
                {announcement.title}
              </Text>
            </Layout>
            {announcement.state && (
              <Layout display="flex">
                <Text color="black" size={getRem(14)}>
                  # {announcement.state}
                </Text>
              </Layout>
            )}
            {announcement.size && (
              <Layout display="flex" flex={1}>
                <Text color="black" size={getRem(14)}>
                  # {announcement.size} m^2
                </Text>
              </Layout>
            )}
            {announcement.location && date && (
              <Text color="black" size={getRem(16)}>
                {announcement.location} - {date}
              </Text>
            )}
          </Layout>
        </StyledLayout>
      </Link>
      <Layout display="flex" direction="column" padding={[10, 15]}>
        <Text size={getRem(16)}>
          Odstępne:
          <br />
          {announcement.fee.toFixed(2)} PLN / miesiąc
        </Text>
        <Text flex={1} size={getRem(16)}>
          Czynsz:
          <br />
          {announcement.rent.toFixed(2)} PLN / miesiąc
        </Text>
        <Layout display="flex" justifyContent="right">
          {typeView ? (
            <Layout>
              <StyledFavoriteIcon
                onClick={() => removeFromObserved(rest._id)}
              />
            </Layout>
          ) : (
            <button
              type="submit"
              onClick={() => addToObserved(announcement._id)}
            >
              <StyledFavoriteBorderIcon />
            </button>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';

import { deleteQuery } from '~/api/delete';
import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { ModalComponent } from '~/components/compounds/ModalComponent';
import { useModalComponent } from '~/components/compounds/ModalComponent/useModalComponent';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { default_avatar_url } from '~/constants/GLOBAL.constants';
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

const StyledEditIcon = styled(EditIcon)`
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 1);
    cursor: pointer;
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 1);
    cursor: pointer;
  }
`;

export const AnnouncementCard = ({
  announcement,
  typeView,
  rest,
  edit,
  noObserved,
  minWidth,
  width,
}: {
  announcement: AnnouncementsModel;
  typeView?: string;
  rest?: any;
  edit?: boolean;
  noObserved?: boolean;
  minWidth?: string;
  width?: string;
}) => {
  const [del, setDel] = useState(false);

  const { modalActive, setModalActive, modalData, setModalData } =
    useModalComponent();

  const { personID } = useAuth();

  const addToObserved = async (id: string) => {
    const result = await postQuery('observed', {
      announcement: id,
      person: personID,
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

  const setDeleteAnnouncement = async (id: string) => {
    setModalActive(false);
    const response = await deleteQuery('announcements', id);
    if (response) {
      window.location.reload();
      toast.success('Pomyślnie usunięto ogłoszenie.');
    }
  };

  let date = `dodano ${parseData(
    announcement.created_at || ''
  )} - godzina ${parseHour(announcement.created_at || '')}`;

  if (noObserved) {
    date += `, zakończono ${parseData(
      announcement.updated_at || ''
    )} - godzina ${parseHour(announcement.updated_at || '')}`;
  }

  return (
    <>
      <Layout
        background="var(--background-white)"
        height={200}
        margin={[10]}
        display="flex"
        borderRadius="16px"
        justifyContent="space-between"
        boxShadow="0 0 5px #ccc"
        width={width || '75%'}
        minWidth={minWidth || '1175px'}
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
          {edit ? (
            <Layout display="flex" justifyContent="right" gap="10px">
              <Link href={`/announcements/edit/${announcement._id}`} passHref>
                <StyledEditIcon />
              </Link>
              <Layout
                onClick={() => {
                  setModalData({
                    id: announcement._id,
                    description: announcement.title,
                  });
                  setModalActive(true);
                }}
              >
                <StyledDeleteIcon />
              </Layout>
            </Layout>
          ) : (
            !noObserved && (
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
            )
          )}
        </Layout>
      </Layout>
      {modalActive && modalData && (
        <ModalComponent
          title="Usuwanie ogłoszenia"
          description={`Czy na pewno chcesz usunąć ogłoszenie: ${modalData.description}?`}
          onHide={() => setModalActive(false)}
          onConfirm={() => setDeleteAnnouncement(modalData.id)}
          cancelButton
          cancelText="Anuluj"
          confirmButton
          confirmText="Usuń"
        />
      )}
    </>
  );
};

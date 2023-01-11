import { useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

import { getData } from '~/api/get';
import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Images } from '~/components/compounds/Images';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { makeFullDataHour } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import {
  AnnouncementModel,
  AnnouncementModelInitialState,
} from '~/models/announcement.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  border: 2px solid rgba(240, 240, 240);

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
    cursor: pointer;
  }
`;

const StyledChip = styled(Layout)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 8px;
  border: 2px solid var(--background-medium-blue);
`;

export const Announcement = () => {
  const { personID } = useAuth();

  const router = useRouter();
  const [contactState, setContactState] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const { data, isLoading } = useGetData<AnnouncementModel>(
    AnnouncementModelInitialState,
    'announcements',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const addMessage = async () => {
    if (messageValue.trim().length < 4) {
      return toast.error('Wiadomość powinna być dłuższa niż 4 znaki.');
    }

    const result = await getData(
      'conversations',
      `checkExistFrom/${data._id}/${personID}`
    );
    if (result) {
      // konwersacja znaleziona, wiec wysylamy tylko wiadomosc
      const message = await postQuery('messages', {
        conversation: result[0]._id,
        announcement: result[0].announcement,
        person: personID,
        content: messageValue,
      });
      if (message) {
        toast.success('Wiadomość została wysłana.');
        setMessageValue('');
        setContactState(false);
      }
    } else {
      // konwersacji nie ma -> tworzymy konwersacje, a nastepnie wiadomosc...
      const conversation = await postQuery('conversations', {
        announcement: data._id,
        person_from: personID,
        person_to: data.person._id,
      });
      if (conversation) {
        addMessage();
      }
    }
    return null;
  };

  return (
    <Layout
      display="flex"
      direction="column"
      alignItems="center"
      marginTop={25}
    >
      <Layout
        display="flex"
        width="70%"
        minWidth="1000px"
        background="var(--background-white)"
        borderRadius="8px"
        boxShadow="0 0 10px #ccc"
        direction="column"
      >
        <Layout display="flex" justifyContent="center" marginTop="10">
          <Text size={getRem(18)} weight={700}>
            {data.title}
          </Text>
        </Layout>

        <Layout
          display="flex"
          marginLeft="auto"
          marginRight="auto"
          marginTop="5"
        >
          <Images
            images={data.images}
            imageURL="/uploads/pictures/"
            maxWidth="600px"
          />
        </Layout>
        <Layout display="flex" margin={[10, 25]} direction="column" gap="10px">
          <Layout display="flex" flex="wrap" gap="10px">
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Liczba pokoi:</b> {data.rooms}
              </Text>
            </StyledChip>
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Wielkość nieruchomości:</b> {data.size} m²
              </Text>
            </StyledChip>
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Wyposażenie:</b> {data.state}
              </Text>
            </StyledChip>
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Lokalizacja:</b> {data.location}
              </Text>
            </StyledChip>
          </Layout>

          <Layout display="flex" flex="wrap" gap="10px">
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Odstępne:</b> {data.fee}zł / miesiąc
              </Text>
            </StyledChip>
            <StyledChip>
              <Text size={getRem(12)}>
                <b>Czynsz:</b> {data.rent}zł / miesiąc
              </Text>
            </StyledChip>
          </Layout>
        </Layout>
        <Layout display="flex" margin={[10, 25]} direction="column">
          <Text size={getRem(12)}>
            <b>Opis:</b>
          </Text>
          <Text size={getRem(12)}>{data.description}</Text>
        </Layout>
        <Layout
          display="flex"
          margin={[10, 25]}
          direction="column"
          marginLeft="auto"
        >
          <Text color="rgb(100, 100, 100)" size={getRem(11)}>
            <b>Ogłoszenie dodane:</b> {makeFullDataHour(data.created_at, '')}
          </Text>
        </Layout>
      </Layout>
      <Layout
        marginTop={25}
        margin={[25, 0]}
        display="flex"
        width="50%"
        background="var(--background-white)"
        borderRadius="8px"
        boxShadow="0 0 10px #ccc"
        direction="column"
        padding={[10, 25]}
      >
        <Layout display="flex" alignItems="center" direction="column">
          <Text size={getRem(16)} weight={600}>
            KONTAKT Z OGŁOSZENIODAWCĄ
          </Text>
          <Text size={getRem(14)}>
            {data.person.name}, tel. {data.person.phone_number}
          </Text>
          {contactState ? (
            <Layout width="100%" marginTop={10}>
              <FloatingLabel controlId="floatingTextarea2" label="Wiadomość">
                <Form.Control
                  as="textarea"
                  style={{ height: '100px', resize: 'none' }}
                  value={messageValue}
                  onChange={(e) => {
                    setMessageValue(e.target.value);
                  }}
                />
              </FloatingLabel>
              <StyledLayout
                display="flex"
                justifyContent="center"
                marginLeft="auto"
                marginRight="auto"
                marginTop={10}
                borderRadius="10px"
                background="rgb(240, 240, 240)"
                padding={[5, 15]}
                width={175}
                onClick={addMessage}
              >
                <Text size={getRem(16)}>Wyślij wiadomość</Text>
              </StyledLayout>
            </Layout>
          ) : (
            <StyledLayout
              boxShadow="0 0 3px #ccc"
              padding={[5]}
              borderRadius="5px"
              background="rgb(235, 235, 235)"
              marginTop={5}
              onClick={() => {
                setContactState(true);
              }}
            >
              <Text size={getRem(12)}>
                {/* TODO: message to advertiser */}
                <b>Skontaktuj się z ogłoszeniodawcą</b>
              </Text>
            </StyledLayout>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Announcement;

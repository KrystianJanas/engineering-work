import { useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';

import styled from '@emotion/styled';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';

import { default_avatar_url } from '~/GLOBAL.constants';
import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { useDateParser } from '~/hooks/useDateParser';
import { AnnouncementModel } from '~/models/announcement.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  border: 2px solid rgba(240, 240, 240);

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
    cursor: pointer;
  }
`;

export const Announcement = ({ data }: { data: AnnouncementModel }) => {
  const [contactState, setContactState] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const { date } = useDateParser(data.created_at);

  return (
    <Layout
      display="flex"
      direction="column"
      alignItems="center"
      marginTop={25}
    >
      <Layout display="flex" justifyContent="left">
        <Link href="/announcements" passHref>
          <Text size={getRem(16)}>(( Powrót do tabeli ogłoszeń ))</Text>
        </Link>
      </Layout>
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
        {data.images ? (
          <Layout
            display="flex"
            marginLeft="auto"
            marginRight="auto"
            marginTop="5"
          >
            <img
              src={data.images[0] || default_avatar_url}
              aria-hidden
              alt=""
            />
          </Layout>
        ) : (
          <Layout
            display="flex"
            borderRadius="8px"
            background="rgb(230,230,230,0.5)"
            marginLeft="auto"
            marginRight="auto"
            width="95%"
            margin={[10]}
            justifyContent="center"
          >
            <Text size={getRem(16)}>BRAK ZDJĘCIA</Text>
          </Layout>
        )}
        <Layout display="flex" margin={[10, 25]} direction="column">
          <Text size={getRem(12)}>
            <b>Liczba pokoi:</b> {data.rooms}
          </Text>
          <Text size={getRem(12)}>
            <b>Wielkość nieruchomości:</b> {data.size} m^2
          </Text>
          <Text size={getRem(12)}>
            <b>Wyposażenie:</b> {data.state}
          </Text>

          <Text size={getRem(12)}>
            <b>Lokalizacja:</b> {data.location}
          </Text>
          <Layout marginTop={10}>
            <Text size={getRem(12)}>
              <b>Odstępne:</b> {data.fee}zł / miesiąc
            </Text>
            <Text size={getRem(12)}>
              <b>Czynsz:</b> {data.rent}zł / miesiąc
            </Text>
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
            <b>Ogłoszenie dodane:</b> {date}
          </Text>
          <Text color="rgb(100, 100, 100)" size={getRem(11)}>
            <b>Liczba wyświetleń ogłoszenia:</b> {data.views}
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
                onClick={() => {
                  console.log(messageValue);
                  // todo: send to api message
                }}
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

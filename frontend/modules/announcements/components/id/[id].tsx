import { useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

import { Text } from '~/components/atoms/typography';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

import { AnnouncementInitialState } from '../../announcements.constants';

const StyledLayout = styled(Layout)`
  border: 2px solid rgba(240, 240, 240);

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
    cursor: pointer;
  }
`;

export const Announcement = () => {
  const data = AnnouncementInitialState;
  const [contactState, setContactState] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const router = useRouter();
  if (router.isReady) {
    return (
      <Layout display="flex" direction="column" alignItems="center">
        <Layout
          marginTop={25}
          display="flex"
          width="50%"
          background="rgb(255,255,255)"
          borderRadius="8px"
          boxShadow="0 0 10px #ccc"
          direction="column"
        >
          <Layout display="flex" justifyContent="center" marginTop="10">
            <Text size={getRem(18)} weight={700}>
              {data.title}
            </Text>
          </Layout>
          {data.imageUrl ? (
            <Layout
              display="flex"
              marginLeft="auto"
              marginRight="auto"
              width="75%"
              marginTop="5"
            >
              <img src={data.imageUrl} aria-hidden alt="" />
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
              <b>Wyposażenie:</b> {data.state}
            </Text>
            <Text size={getRem(12)}>
              <b>Metraż:</b> {data.size} m^2
            </Text>
            <Text size={getRem(12)}>
              <b>Liczba pokoi:</b> {data.rooms}
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
              <b>Ogłoszenie dodane:</b> {data.date_add}
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
          width="40%"
          background="rgb(255,255,255)"
          borderRadius="8px"
          boxShadow="0 0 10px #ccc"
          direction="column"
          padding={[10, 25]}
        >
          <Layout display="flex" alignItems="center" direction="column">
            <Text size={getRem(16)} weight={600}>
              KONTAKT Z OGŁOSZENIODAWCĄ
            </Text>
            <Text size={getRem(12)}>{data.advertiser?.name}</Text>
            <Text size={getRem(12)}>Tel. {data.advertiser?.phone}</Text>
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
  }
  return <SpinnerLoading />;
};
export default Announcement;
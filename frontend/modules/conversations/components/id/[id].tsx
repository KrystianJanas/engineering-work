import { useMemo, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

import { getPage } from '~/api/get';
import { Text } from '~/components/atoms/typography';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { parseData, parseHour } from '~/hooks/useDateParser';
import { getRem } from '~/styles/utils';
import { MessageConversationType } from '~/types/messages.types';

const StyledLayout = styled(Layout)`
  border: 2px solid rgba(240, 240, 240);

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
    cursor: pointer;
  }
`;

export const Conversation = () => {
  const router = useRouter();
  const [messageFieldStatus, setMessageFieldStatus] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const [data, setData] = useState<[]>();
  const [isLoaded, setIsLoaded] = useState(true);

  const getData = async () => {
    setIsLoaded(false);
    setData(await getPage('messages', router.query.id?.toString()));
  };

  console.log(data);

  useMemo(() => {
    if (router.isReady) {
      getData().then(null);
    }
  }, [router]);

  if (router.isReady) {
    if (!isLoaded && data) {
      return (
        <Layout
          background="rgb(245,245,245,1)"
          padding={[10, 15]}
          display="flex"
          borderRadius="6px"
          width="75%"
          marginLeft="auto"
          marginRight="auto"
          direction="column"
        >
          <Layout display="flex" justifyContent="center">
            <Text size={getRem(22)} weight={700}>
              {router.query.message}
            </Text>
          </Layout>
          {data.map((message: MessageConversationType) => (
            <Layout
              width="100%"
              background="var(--background-white)"
              margin={[10]}
              padding={[10]}
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              key={message._id}
            >
              <Layout marginBottom={10}>
                <Layout display="flex">
                  <Layout flex={1}>
                    <Text size={getRem(14)} textAlign="center">
                      Wiadomość od <b>{message.person.name}</b> z dnia&nbsp;
                      <b>{parseData(message.created_at)}</b>, godzina&nbsp;
                      <b>{parseHour(message.created_at)}</b>
                    </Text>
                    <Layout
                      marginLeft="auto"
                      marginRight="auto"
                      marginTop={3}
                      marginBottom={3}
                      width="100%"
                      background="rgb(0,0,0)"
                      height={1}
                    />
                  </Layout>
                </Layout>
              </Layout>
              <Text size={getRem(18)}>{message.content}</Text>
            </Layout>
          ))}
          <Layout
            marginTop={10}
            marginBottom={10}
            marginLeft="auto"
            marginRight="auto"
            width="95%"
            height={3}
            background="rgb(200, 200, 200)"
          />
          <Layout
            display="flex"
            marginLeft="auto"
            marginRight="auto"
            padding={[10]}
            background="var(--background-white)"
            borderRadius="6px"
            boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
            width="75%"
            direction="column"
            alignItems="center"
            marginBottom={15}
          >
            {messageFieldStatus ? (
              <Layout
                width="100%"
                display="flex"
                justifyContent="center"
                direction="column"
              >
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
                  marginLeft="auto"
                  marginRight="auto"
                  marginTop={10}
                  borderRadius="10px"
                  background="rgb(240, 240, 240)"
                  padding={[5, 15]}
                  onClick={() => {
                    console.log(messageValue);
                    // todo: send to api message
                  }}
                >
                  <Text size={getRem(16)}>Dodaj odpowiedź</Text>
                </StyledLayout>
              </Layout>
            ) : (
              <>
                <Text size={getRem(16)} weight={500}>
                  Chcesz dodać odpowiedź do konwersacji?
                </Text>

                <StyledLayout
                  display="flex"
                  marginLeft="auto"
                  marginRight="auto"
                  borderRadius="10px"
                  marginTop={5}
                  background="rgb(240, 240, 240)"
                  padding={[5, 15]}
                  onClick={() => {
                    setMessageFieldStatus(true);
                  }}
                >
                  <Text size={getRem(16)}>Dodaj odpowiedź</Text>
                </StyledLayout>
              </>
            )}
          </Layout>
        </Layout>
      );
    }
  }
  return <SpinnerLoading />;
};

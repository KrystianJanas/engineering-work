import { useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';

import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { Line } from '~/components/compounds/Line';
import { MessageCardComponent } from '~/components/compounds/Message-Card/messageCard.component';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import { getRem } from '~/styles/utils';
import {
  MessageConversationType,
  MessageConversationTypeInitialState,
} from '~/types/messages.types';

export const Conversation = () => {
  const router = useRouter();
  const [messageFieldStatus, setMessageFieldStatus] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const { personID } = useAuth();

  const { data, isLoading } = useGetData<MessageConversationType[]>(
    [MessageConversationTypeInitialState],
    'messages',
    `${router.query.id}`,
    0,
    0,
    { personID }
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const addMessage = async () => {
    if (messageValue.trim().length < 4) {
      return toast.error('Wiadomość powinna zawierać co najmniej 4 znaki.');
    }
    const result = await postQuery('messages', {
      conversation: data[0].conversation,
      announcement: data[0].announcement._id,
      person: personID,
      content: messageValue,
    });
    if (result) {
      toast.success('Pomyślnie dodano wiadomość do ogłoszenia.');
      window.location.reload();
    }
    return null;
  };

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
      boxShadow="0 0 5px 1px var(--border-black)"
      marginTop={15}
    >
      <Layout display="flex" justifyContent="center">
        <Text size={getRem(22)} weight={700}>
          {data[0]?.announcement.title ||
            'Błąd: Nie znaleziono danych dotyczących tego ogłoszenia.'}
        </Text>
      </Layout>
      <Layout height={550} overflowY="auto" padding={[10]} marginBottom={25}>
        {data.length > 0 && (
          <Text textAlign="center" size={getRem(16)}>
            Wiadomości posegregowane: <b>od najnowszej</b>.
          </Text>
        )}

        {data.map((message: MessageConversationType) => (
          <MessageCardComponent
            key={message._id}
            person={message.person.name}
            data={message.created_at}
            content={message.content}
          />
        ))}
      </Layout>
      <Line />
      {data && data.length > 0 && (
        <Layout
          display="flex"
          marginLeft="auto"
          marginRight="auto"
          padding={[10]}
          background="var(--background-white)"
          borderRadius="6px"
          boxShadow="0 0 4px rgba(0, 0, 0, 0.24)"
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
              <Layout display="flex" justifyContent="center" marginTop={10}>
                <Button text="Dodaj odpowiedź" onSubmit={addMessage} />
              </Layout>
            </Layout>
          ) : (
            <>
              <Text size={getRem(16)} weight={400}>
                Chcesz dodać odpowiedź do konwersacji?
              </Text>

              <Layout marginTop={5}>
                <Button
                  text="Rozwiń panel"
                  onSubmit={() => setMessageFieldStatus(true)}
                />
              </Layout>
            </>
          )}
        </Layout>
      )}
    </Layout>
  );
};

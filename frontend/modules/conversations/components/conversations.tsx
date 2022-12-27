import { useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { ConversationCard } from '~/components/compounds/Message-Card';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import {
  ConversationTypes,
  ConversationTypesInitialState,
} from '~/models/conversation.model';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)<{
  checkedOption: string;
  optionMessage: string;
}>`
  border: ${(props) =>
    props.checkedOption === props.optionMessage
      ? `2px solid rgba(18, 185, 172, 1)`
      : undefined};

  &:hover {
    border: 2px solid rgba(18, 185, 172, 0.5);
  }
`;

const StyledButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

export const Conversations = () => {
  const [optionMessage, setOptionMessage] = useState('send'); // true: send conversations | false: received conversations

  const { personID } = useAuth();

  const changeOptionMessage = (option: string) => {
    setOptionMessage(option);
  };

  const [restEndpoint, setRestEndpoint] = useState(`from/${personID}`);

  const { data, isLoading, setUpdateState } = useGetData<ConversationTypes[]>(
    [ConversationTypesInitialState],
    'conversations',
    restEndpoint
  );

  useMemo(() => {
    if (optionMessage === 'send') {
      setRestEndpoint(`from/${personID}`);
      setUpdateState(true);
    } else if (optionMessage === 'received') {
      setRestEndpoint(`to/${personID}`);
      setUpdateState(true);
    }
  }, [optionMessage]);

  if (isLoading) {
    return <SpinnerLoading />;
  }
  if (data) {
    return (
      <Layout padding={[10]} marginLeft="auto" marginRight="auto" width="75%">
        {/* TOP SECTION */}
        <Layout
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="25px"
          marginBottom={25}
        >
          <StyledButton onClick={() => changeOptionMessage('send')}>
            <StyledLayout
              display="flex"
              width={250}
              height={50}
              background="var(--background-white)"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              checkedOption="send"
              optionMessage={optionMessage}
            >
              <Text size={getRem(18)}>
                <b>Wiadomości wysłane</b>
              </Text>
            </StyledLayout>
          </StyledButton>
          <StyledButton onClick={() => changeOptionMessage('received')}>
            <StyledLayout
              display="flex"
              width={250}
              height={50}
              background="var(--background-white)"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              checkedOption="received"
              optionMessage={optionMessage}
            >
              <Text size={getRem(18)}>
                <b>Wiadomości otrzymane</b>
              </Text>
            </StyledLayout>
          </StyledButton>
        </Layout>
        {/* BOTTOM SECTION */}
        {data.length > 0 ? (
          data.map((conversation: ConversationTypes) => {
            return (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
              />
            );
          })
        ) : (
          <Text textAlign="center">
            Nie znaleziono żadnych wiadomości w tej sekcji.
          </Text>
        )}
      </Layout>
    );
  }
  return null;
};

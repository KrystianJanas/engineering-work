import { useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { getPage } from '~/api/get';
import { Text } from '~/components/atoms/typography';
import { ConversationCard } from '~/components/compounds/Message-Card';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { ConversationTypes } from '~/models/conversation.model';
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
  const personId = '638a765c53adff6e06432323'; // TODO: change person id after authentication
  // const personId = '638fb4c573eedbc3f53f214e';

  const changeOptionMessage = (option: string) => {
    setOptionMessage(option);
  };

  const [data, setData] = useState<[]>();
  const [isLoaded, setIsLoaded] = useState(true);

  const getData = async (restEndpoint: string) => {
    setIsLoaded(false);
    setData(await getPage('conversations', restEndpoint));
  };

  useMemo(() => {
    if (optionMessage === 'send') {
      getData(`from/${personId}`);
    } else if (optionMessage === 'received') {
      getData(`to/${personId}`);
    }
  }, [optionMessage]);

  if (isLoaded || !data) {
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

import { useState } from 'react';

import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { MessageCard } from '~/components/compounds/Message-Card';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

import { MessagesInitialState } from '../messages.constants';

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

export const Messages = () => {
  const [optionMessage, setOptionMessage] = useState('send'); // true: send messages | false: received messages

  const changeOptionMessage = (option: string) => {
    setOptionMessage(option);
  };

  return (
    <Layout>
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
              background="rgb(255,255,255)"
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
              background="rgb(255,255,255)"
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
        {MessagesInitialState.map((message) => {
          if (message.type === optionMessage) {
            return <MessageCard key={message.id} message={message} />;
          }
          return null;
        })}
      </Layout>
    </Layout>
  );
};
export default Messages;

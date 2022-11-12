import styled from '@emotion/styled';
import Link from 'next/link';

import { Layout } from '~/components/molecules/layout';
import { MessagesTypes } from '~/types/messages.types';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  border-radius: 10px;
`;

export const MessageCard = ({ message }: { message: MessagesTypes }) => {
  return (
    <Link
      href={{
        pathname: `/messages/${message.id}`,
        query: {
          message: message.announcement.title,
        },
      }}
      passHref
    >
      <StyledLayout
        background="rgb(255, 255, 255)"
        borderRadius="6px"
        boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
        padding={[10]}
        margin={[20, 15]}
        display="flex"
      >
        <Layout
          width={150}
          height="auto"
          boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
          display="flex"
          marginRight={15}
          borderRadius="10px"
          justifyContent="center"
          alignItems="center"
        >
          {message.announcement.image_url ? (
            <StyledImage
              src={message.announcement.image_url}
              aria-hidden
              alt=""
            />
          ) : (
            <StyledImage src="no-image-icon.png" aria-hidden alt="" />
          )}
        </Layout>
        <Layout display="flex" direction="column">
          <Layout display="flex" flex={1}>
            {message.announcement.title}
          </Layout>
          <Layout display="flex">
            <b>Liczba wiadomości:</b>&nbsp;{message.messages} |
            <b>&nbsp;Data rozpoczęcia konwersacji:</b>&nbsp;{message.date}
          </Layout>
        </Layout>
      </StyledLayout>
    </Link>
  );
};
export default MessageCard;

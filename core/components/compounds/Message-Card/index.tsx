import styled from '@emotion/styled';
import Link from 'next/link';

import { Layout } from '~/components/molecules/layout';

import { MessagesTypes } from '../../../../modules/messages';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

export const MessageCard = ({ message }: { message: MessagesTypes }) => {
  return (
    <Link
      href={{
        pathname: `/messages/${message.id}`,
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
        onClick={() => console.log('test')}
      >
        <Layout
          width={150}
          height={100}
          boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
          display="flex"
          marginRight={10}
          justifyContent="center"
          alignItems="center"
        >
          <img src={message.announcement.image_url} alt="" />
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

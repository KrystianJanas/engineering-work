import styled from '@emotion/styled';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { useDateParser } from '~/hooks/useDateParser';
import { ConversationTypes } from '~/models/conversation.model';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  border-radius: 10px;
`;

export const ConversationCard = ({
  conversation,
}: {
  conversation: ConversationTypes;
}) => {
  const { date } = useDateParser(conversation.created_at);
  return (
    <Link
      href={{
        pathname: `/conversations/${conversation._id}`,
        query: {
          message: conversation.announcement.title,
        }, // this is to edit - we want to get object announcement-name into conversations/:id
      }}
      passHref
    >
      <StyledLayout
        background="var(--background-white)"
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
          {conversation.announcement.images[0] ? (
            <StyledImage
              src={conversation.announcement.images[0]}
              aria-hidden
              alt=""
            />
          ) : (
            <StyledImage src="no-image-icon.png" aria-hidden alt="" />
          )}
        </Layout>
        <Layout display="flex" direction="column">
          <Layout display="flex" flex={1}>
            {conversation.announcement.title}
          </Layout>
          <Layout>
            <Layout display="flex" gap="5px">
              <Text weight={600}>Ogłoszeniodawca:</Text>
              <Text>{conversation.person_to.name}</Text>
            </Layout>
            <Layout display="flex" gap="5px">
              <Text weight={600}>Data rozpoczęcia konwersacji:</Text>
              <Text>{date}</Text>
            </Layout>
          </Layout>
        </Layout>
      </StyledLayout>
    </Link>
  );
};

import { Text } from '~/components/atoms/typography';
import { MessageCardTypes } from '~/components/compounds/Message-Card/messageCard.types';
import { Layout } from '~/components/molecules/layout';
import { makeFullDataHour } from '~/hooks/useDateParser';
import { getRem } from '~/styles/utils';

export const MessageCardComponent = ({ ...data }: MessageCardTypes) => {
  return (
    <Layout
      width="100%"
      boxShadow="0 0 5px 1px var(--border-black)"
      padding={[10]}
      margin={[15, 0]}
      borderRadius="8px"
    >
      <Layout display="flex">
        <Text size={getRem(14)} flex={1}>
          Wiadomość od {data.person}{' '}
          {data.additional?.estate_owner === data.additional?.personID && (
            <b>(zarządca nieruchomości)</b>
          )}
        </Text>
        <Text size={getRem(14)}>
          {makeFullDataHour(data.data, 'Data dodania:')}
        </Text>
      </Layout>
      <Layout
        width="95%"
        background="var(--border-light-black)"
        height={2}
        margin={[5, 0]}
        borderRadius="1px"
        marginLeft="auto"
        marginRight="auto"
      />
      <Text size={getRem(16)}>{data.content}</Text>
    </Layout>
  );
};

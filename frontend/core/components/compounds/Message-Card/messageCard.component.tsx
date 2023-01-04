import { Text } from '~/components/atoms/typography';
import { MessageCardTypes } from '~/components/compounds/Message-Card/messageCard.types';
import { Layout } from '~/components/molecules/layout';
import { makeFullDataHour } from '~/hooks/useDateParser';
import { getRem } from '~/styles/utils';

export const MessageCardComponent = ({ ...data }: MessageCardTypes) => {
  return (
    <Layout width="100%" marginBottom={10}>
      <Text color="var(--text-black)" size={getRem(13)} weight={600}>
        {`${data.person}, ${makeFullDataHour(data.data, '')} ${
          data.additional?.personID === data.additional?.estate_owner
            ? '( zarządca nieruchomości )'
            : ''
        }`}
      </Text>
      <Layout
        width="100%"
        boxShadow={data.boxShadow || '0 0 5px 1px var(--border-black)'}
        padding={[10]}
        borderRadius={data.borderRadius || '8px'}
      >
        <Layout margin={[0, 250, 0, 0]}>
          <Text size={getRem(16)}>{data.content}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

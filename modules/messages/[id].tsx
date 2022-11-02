import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import Spinner from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

import { MessageInitialState } from './messages.constants';

export const Message = () => {
  const router = useRouter();

  if (router.isReady) {
    const data = MessageInitialState;

    if (data) {
      return (
        <Layout
          background="rgb(240,240,240)"
          padding={[10, 15]}
          display="flex"
          borderRadius="6px"
          boxShadow="0 0 5px #ccc"
          width="75%"
          marginLeft="auto"
          marginRight="auto"
          direction="column"
        >
          {data.messages.map((message) => (
            <Layout
              width="100%"
              background="rgb(255,255,255)"
              margin={[10]}
              padding={[10]}
              borderRadius="6px"
              boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
              key={message.id}
            >
              <Layout marginBottom={10}>
                <Layout display="flex">
                  <Layout flex={1}>
                    <Text size={getRem(14)}>
                      Wiadomość z dnia <b>{message.date}</b>
                      &nbsp; od <b>{message.from}</b>
                    </Text>
                  </Layout>
                  <Layout>#{message.id}</Layout>
                </Layout>
              </Layout>
              <Text size={getRem(18)}>{message.message}</Text>
            </Layout>
          ))}
        </Layout>
      );
    }
  }
  return <Spinner />;
};

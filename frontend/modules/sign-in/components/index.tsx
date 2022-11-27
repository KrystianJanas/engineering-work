import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';

export const SignIn = () => {
  return (
    <Layout
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Layout
        width={640}
        height={480}
        background="var(--background-white)"
        borderRadius="16px"
      >
        <Layout display="flex" justifyContent="center" margin={[25, 0]}>
          <Text fontFamily="Inter" weight={600} size="1.35rem" color="black">
            Zaloguj się do serwisu nieruchomości
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

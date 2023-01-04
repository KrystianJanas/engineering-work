import { Layout } from '~/components/molecules/layout';

export const Line = ({ background }: { background?: string }) => {
  return (
    <Layout
      background={background || 'var(--background-medium-grey)'}
      borderRadius="6px"
      width="95%"
      height={2}
      marginLeft="auto"
      marginRight="auto"
      marginTop={5}
      marginBottom={5}
    />
  );
};

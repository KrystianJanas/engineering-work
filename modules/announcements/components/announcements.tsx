import styled from '@emotion/styled';

import { Layout } from '~/components/molecules/layout';

import { AnnouncementInitialState } from '../announcements.constants';

const StyledLayout = styled(Layout)`
  width: 75%;
  box-shadow: 0 8px 40px rgba(3, 14, 17, 0.1);
`;

const StyledAvatarLayout = styled(Layout)``;

export const AnnouncementsView = () => {
  return (
    <Layout display="flex" justifyContent="center" wrap="wrap" margin={[10, 0]}>
      {AnnouncementInitialState.map((announcement) => (
        <StyledLayout
          background="rgb(255,255,255)"
          height={200}
          key={announcement.id}
          margin={[10]}
          display="flex"
          alignItems="center"
          borderRadius="16px"
          justifyContent="space-between"
        >
          <StyledAvatarLayout
            width={165}
            height={165}
            margin={[15]}
            background="rgb(240, 240, 240, 0.5)"
            borderRadius="16px"
          >
            AVATAR WILL BE ADD HERE...
          </StyledAvatarLayout>

          <Layout padding={[10]} display="flex">
            {announcement.title}
          </Layout>

          <Layout padding={[10]}>{announcement.price} PLN</Layout>
        </StyledLayout>
      ))}
    </Layout>
  );
};

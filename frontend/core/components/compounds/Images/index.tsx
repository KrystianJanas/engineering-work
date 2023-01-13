import { useState } from 'react';
import { Image } from 'react-bootstrap';

import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 6px;
`;

export const Images = ({
  images,
  maxWidth,
  maxHeight,
  imageURL,
}: {
  images: string[];
  maxWidth?: string;
  maxHeight?: string;
  imageURL?: string;
}) => {
  const [image, setImage] = useState(0);

  const upImage = () => {
    if (image >= images.length - 1) return null;
    setImage(image + 1);
    return null;
  };

  const downImage = () => {
    if (image <= 0) return null;
    setImage(image - 1);
    return null;
  };

  return images.length > 0 ? (
    <Layout display="flex" direction="column" alignItems="center" gap="5px">
      <Layout
        maxWidth={maxWidth && maxWidth}
        maxHeight={maxHeight && maxHeight}
      >
        <StyledImage src={`${imageURL || ''}${images[image]}`} alt="" />
      </Layout>
      <Layout display="flex" direction="row" gap="25px">
        <Button text="Poprzednie zdjęcie" onSubmit={downImage} />{' '}
        <Button text="Następne zdjęcie" onSubmit={upImage} />
      </Layout>
    </Layout>
  ) : (
    <Layout>
      <Text color="var(--text-black)" size={getRem(16)}>
        Brak dostępnych zdjęć nieruchomości.
      </Text>
    </Layout>
  );
};

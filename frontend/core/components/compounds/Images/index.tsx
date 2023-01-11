import { useState } from 'react';
import { Image } from 'react-bootstrap';

import styled from '@emotion/styled';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';

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
    <Layout display="flex" direction="row" alignItems="center" gap="25px">
      <StyledLayout onClick={() => downImage()}>
        <ArrowLeftOutlined
          sx={{
            width: '50px',
            height: '50px',
            color: 'rgba(0, 0, 0, 0.4)',
            ':hover': { color: 'rgba(0, 0, 0, 1)' },
          }}
        />
      </StyledLayout>
      <Layout
        maxWidth={maxWidth && maxWidth}
        maxHeight={maxHeight && maxHeight}
      >
        <StyledImage src={`${imageURL || ''}${images[image]}`} alt="" />
      </Layout>{' '}
      <StyledLayout onClick={() => upImage()}>
        <ArrowRightOutlined
          sx={{
            width: '50px',
            height: '50px',
            color: 'rgba(0, 0, 0, 0.4)',
            ':hover': { color: 'rgba(0, 0, 0, 1)' },
          }}
        />
      </StyledLayout>
    </Layout>
  ) : (
    <Layout>
      <Text>Brak dostępnych zdjęć.</Text>
    </Layout>
  );
};

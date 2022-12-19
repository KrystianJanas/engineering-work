import styled from '@emotion/styled';

const StyledImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const ArrowLeft = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <StyledImg
      src="arrow-left.png"
      width={width && width}
      height={height && height}
      alt=""
    />
  );
};

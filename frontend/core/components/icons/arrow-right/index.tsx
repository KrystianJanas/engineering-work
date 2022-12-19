import styled from '@emotion/styled';

const StyledImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const ArrowRight = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <StyledImg
      src="arrow-right.png"
      width={width && width}
      height={height && height}
      alt=""
    />
  );
};

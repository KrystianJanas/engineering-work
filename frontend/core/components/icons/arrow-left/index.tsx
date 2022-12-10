export const ArrowLeft = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <img
      src="arrow-left.png"
      width={width && width}
      height={height && height}
      alt=""
    />
  );
};

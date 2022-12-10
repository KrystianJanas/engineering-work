export const ArrowRight = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <img
      src="arrow-right.png"
      width={width && width}
      height={height && height}
      alt=""
    />
  );
};

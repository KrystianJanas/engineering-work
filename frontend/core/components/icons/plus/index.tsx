export const PlusIcon = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <img
      src="/plusicon.png"
      width={width && width}
      height={height && height}
      alt=""
    />
  );
};

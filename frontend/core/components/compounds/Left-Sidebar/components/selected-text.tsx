import { Text } from '~/components/atoms/typography';
import { getRem } from '~/styles/utils';

export const getSelectedText = (name: string, color: string) => {
  return (
    <Text weight={600} size={getRem(14)} lineHeight="21px" color={`${color}`}>
      {name}
    </Text>
  );
};

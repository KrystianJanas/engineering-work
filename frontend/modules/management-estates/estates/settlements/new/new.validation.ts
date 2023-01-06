import { mediaRegex } from '~/regex.rules';

export const newSettlementValidation = (
  current: number,
  gas: number,
  water: number
) => {
  if (!current.toString().match(mediaRegex) || current.toString() === '0') {
    return 'Popraw zużycie dla prądu.';
  }

  if (!gas.toString().match(mediaRegex) || gas.toString() === '0') {
    return 'Popraw zużycie dla gazu.';
  }

  if (!water.toString().match(mediaRegex) || water.toString() === '0') {
    return 'Popraw zużycie dla wody.';
  }
  return null;
};
